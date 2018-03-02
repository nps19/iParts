const path = require("path");

const root = relPath => path.resolve(__dirname, relPath);

module.exports = {

    entry: "./src/main.js",

    output: {
        path: root("./dist"),
        filename: "build.js",
    },

    //devtool: "inline-source-map",

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['stage-1']
                    }
                }
            }
        ]
    }

};