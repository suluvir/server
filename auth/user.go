// Suluvir streaming server
// Copyright (C) 2017  Jannis Fink
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

package auth

import (
	"errors"
	"github.com/gorilla/sessions"
	"github.com/jinzhu/gorm"
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/auth"
	"github.com/suluvir/server/util"
	"github.com/suluvir/server/web/setup"
	"go.uber.org/zap"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"time"
)

// TODO improve secret
var store = sessions.NewCookieStore([]byte("a"))

var ErrUsernameInUse = errors.New("username is already in use")
var ErrMailInUse = errors.New("email is already in use")

type changePasswordPayload struct {
	OldPassword       string `json:"old_pw"`
	NewPassword       string `json:"new_pw"`
	NewPasswordRepeat string `json:"new_pw_repeat"`
}

func init() {
	setup.AddCallBack(addRegistrationDisabledToSetup)
}

func addRegistrationDisabledToSetup(_ *http.Request) (string, interface{}) {
	return "registration_disabled", config.GetConfiguration().Auth.RegistrationDisabled
}

// GetUserForSession returns the user for the given session or nil, if no user is found. When no user is found
// for this session, it returns the appropriate error
func GetUserForSession(w http.ResponseWriter, r *http.Request) (*auth.User, error) {
	session, err := GetUserSession(r)
	if err != nil {
		logging.GetLogger().Error("error during session initialization", zap.Error(err))
		return nil, err
	}
	val := session.Values["user"]
	username, ok := val.(string)
	if !ok {
		return nil, errors.New("object stored in session is no string")
	}

	var user auth.User
	schema.GetDatabase().Where("username = ?", username).First(&user)

	if user.Username != "" {
		logging.GetLogger().Debug("restored user for session", zap.String("user name", user.Username))
	}

	return &user, nil
}

func MustGetUserForSession(w http.ResponseWriter, r *http.Request) *auth.User {
	user, err := GetUserForSession(w, r)
	if err != nil {
		logging.GetLogger().Error("error getting user for session", zap.Error(err))
	}
	return user
}

func LoginUser(w http.ResponseWriter, r *http.Request, user auth.User) error {
	session, getErr := GetUserSession(r)
	if getErr != nil {
		logging.GetLogger().Error("error while getting the user session", zap.Error(getErr))
		return getErr
	}

	user.ActiveAt = time.Now()
	schema.GetDatabase().Save(&user)

	session.Values["user"] = user.Username
	saveErr := session.Save(r, w)
	if saveErr != nil {
		logging.GetLogger().Error("error while saving the users session", zap.Error(saveErr))
		return saveErr
	}

	return nil
}

func LogoutUser(w http.ResponseWriter, r *http.Request) {
	session := MustGetUserSession(r)

	DeletePersistentSession(w, r)

	delete(session.Values, "user")

	session.Save(r, w)
}

func GetUserDatabase(w http.ResponseWriter, r *http.Request) *gorm.DB {
	user := MustGetUserForSession(w, r)
	return schema.GetDatabase().Where("user_id = ?", user.ID)
}

// ActivateUser activates the user for the given uuid. It returns an error if there is no user for the given activation code
func ActivateUser(uuid string) error {
	var user auth.User
	schema.GetDatabase().Where("email_activation_code = ?", uuid).First(&user)

	if user.EmailActivationCode == uuid {
		user.AccountStatus = auth.ACCOUNT_STATUS_EMAIL_VERIFIED
		schema.GetDatabase().Save(&user)
		return nil
	} else {
		return errors.New("no user exists for the given activation code")
	}
}

// GetUserWithMinimalInformation returns the minimal information needed for every user
func GetUserWithMinimalInformation() auth.User {
	c := config.GetConfiguration()
	bytes, parseErr := util.GetBytes(c.Quota.Space)
	if parseErr != nil {
		logging.GetLogger().Error("error during quota calculation, setting quota bytes to zero",
			zap.Error(parseErr))
		bytes = 0
	}

	user := auth.User{
		QuotaSongs: c.Quota.Songs,
		QuotaSpace: bytes,
	}
	return user
}

// GetUserByNameOrMail returns the user who has the matching name or mail
func GetUserByNameOrMail(login string) *auth.User {
	var user auth.User
	schema.GetDatabase().Where("username = ? or email = ?", login, login).First(&user)

	return &user
}

// CheckUsernameAndEmail checks if the given username or email is in use and returns the fitting error in that case
func CheckUsernameAndEmail(username, email string) error {
	var user auth.User
	schema.GetDatabase().Where("username = ?", username).First(&user)
	if &user != nil && user.Username == username {
		return ErrUsernameInUse
	}

	schema.GetDatabase().Where("email = ?", email).First(&user)
	if &user != nil && user.Email == email {
		return ErrMailInUse
	}

	return nil
}

// GetUserForAuthProvider returns the user for the given auth provider. The user is nil, if there is no user for the
// given login. When there is a user for the given login, but for the wrong auth provider, the error field is set
// accordingly
func GetUserForAuthProvider(login, provider string) (*auth.User, error) {
	user := GetUserByNameOrMail(login)
	if user.Username != login && user.Email != login {
		return nil, nil
	}

	logging.GetLogger().Info("user for auth provider", zap.String("username", user.Username),
		zap.String("provider", user.AuthProvider))

	if user.AuthProvider != provider {
		return user, errors.New("there is already a user for a different auth provider")
	}
	return user, nil
}

// UserIsLoggedIn checks, if the user for the given request is logged in
func UserIsLoggedIn(w http.ResponseWriter, r *http.Request) bool {
	user := MustGetUserForSession(w, r)
	return user != nil && user.Username != ""
}

// ChangeUserPassword changes the users password. If that fails, it returns an error message describing
// the cause for the user
func ChangeUserPassword(w http.ResponseWriter, r *http.Request) error {
	user := MustGetUserForSession(w, r)

	var payload changePasswordPayload
	util.MultipleReadJsonParse(r, &payload)
	if !user.CheckPassword(payload.OldPassword) {
		return errors.New("Old password is not correct")
	}

	if payload.NewPassword != payload.NewPasswordRepeat {
		return errors.New("New passwords do not match")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(payload.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		logging.GetLogger().Error("error during password hashing", zap.Error(err))
		return errors.New("Password could not be updated")
	}

	user.Password = string(hashedPassword)
	schema.GetDatabase().Save(&user)

	return nil
}
