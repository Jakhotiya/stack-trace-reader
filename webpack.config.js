const path = require('path');

module.exports = {
    entry: './src/client/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public/js')
    },

    mode:"development",

    devServer: {
        hot: true,
        contentBase: path.join(__dirname, 'public'),
        compress: false,
        port: 8082,
        proxy: {
            '/get-trace': 'http://localhost:8081'
        }
    },

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },

    devtool: "source-map"

};