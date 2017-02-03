package dependencyLoader

var SPECIAL_EXTERNAL_JS_FILES = map[string][]string{
	"react": []string{"react-with-addons.min.js"},
	"react-mdl": []string{
		"material.min.js",
		"ReactMDL.min.js",
	},
}

var SPECIAL_EXTERNAL_CSS_FILES = map[string]string{
	"react-mdl": "material.min.css",
}
