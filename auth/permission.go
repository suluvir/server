package auth

import (
	"github.com/gorilla/mux"
	"github.com/suluvir/server/environment"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/auth"
	"github.com/suluvir/server/schema/special"
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/handler/api"
	"net/http"
)

func init() {
	environment.RegisterCallback(addPermissionMiddleware, environment.LOGGER_INITIALIZED)
}

func addPermissionMiddleware() {
	web.AddPrioritizedMiddleware(permissionMiddleware, web.PERMISSION_MIDDLEWARE_PRIORITY)
}

// permissionMiddleware assumes that there is a url variable 'id' which identifies a database object.
// The object for that id is then assumed to be an object belonging to a specific user and is checked,
// whether it was created by the currently logged in user. When the object does not belong to a specific
// user, the access is denied.
// When there is no matching url variable, this function will do nothing.
func permissionMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		if vars["id"] == "" {
			next.ServeHTTP(w, r)
			return
		}

		var mapping schema.ObjectMapping
		schema.GetDatabase().Where("id = ?", vars["id"]).First(&mapping)
		if mapping.ID == "" {
			next.ServeHTTP(w, r)
			return
		}

		var userObject special.UserBelongingObject
		schema.GetDatabase().Table(mapping.Relation).Where("id = ?", mapping.ID).First(&userObject)
		if CheckPermissionForObject(*MustGetUserForSession(w, r), userObject) {
			next.ServeHTTP(w, r)
		} else {
			api.SendJsonError(w, http.StatusForbidden, "You are not allowed to access this url")
		}
	})
}

// CheckPermissionForObject checks whether the given user is allowed to access the given object
func CheckPermissionForObject(user auth.User, object special.UserBelongingObject) bool {
	return user.ID == object.UserId
}
