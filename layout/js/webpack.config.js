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

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractSass = new ExtractTextPlugin({
    filename: "suluvir.css",
});

module.exports = {
    entry: [
        "whatwg-fetch",
        "./src/index.js"
    ],
    output: {
        filename: "suluvir.js",
        path: __dirname + "/dist",
        devtoolModuleFilenameTemplate: "webpack:///[absolute-resource-path]"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".js", ".jsx"]
    },

    stats: {
        children: false
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
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader",
                        options: {
                            includePaths: [__dirname + "/node_modules"]
                        }
                    }]
                })
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
        }),
        extractSass,
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-mdl": "ReactMDL",
        "immutable": "Immutable",
        "material-components-web": "mdc"
    }
};
