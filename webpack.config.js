const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public')
    },

    mode:"development",

    devServer: {
        contentBase:"public",
        hotOnly: true,
        compress: false,
        port: 8082,
        proxy: {
            '/get-trace': 'http://localhost:8081'
        }
    },

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['public']),
        new HtmlWebpackPlugin({template:path.join('src/client/index.html')}),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: "source-map"

};