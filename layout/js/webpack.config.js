var webpack = require('webpack');

module.exports = {
    entry: [
        "whatwg-fetch",
        "./src/index.js"
    ],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        devtoolModuleFilenameTemplate: "webpack:///[absolute-resource-path]"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".js", ".jsx"]
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: "pre",
                use: ["source-map-loader", "eslint-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {presets: ['react', 'es2015', 'stage-2']}
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
        })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-mdl": "ReactMDL",
        "immutable": "Immutable"
    }
};
