'use strict';

const PATH = require("path");

const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require("optimize-js-plugin");

const ROOT = '../../';

const CACHE_DIR_PATH = PATH.resolve(__dirname, ROOT, '.cache/');
const NODE_MODULES = PATH.resolve(__dirname, ROOT, 'node_modules/');

const JS_DIR_NAME = 'js';
const PUBLIC_DIR = PATH.resolve(__dirname, ROOT, 'dist/');
const JS_ASSETS_DIR =  PATH.resolve(PUBLIC_DIR, `${JS_DIR_NAME}/`);

const config = {
    entry: {
        vendor: [
            'react',
            'react-dom',
            'react-hot-loader',
            'react-router-dom'
        ]
    },
    output: {
        path: JS_ASSETS_DIR,
        filename: '[name].dll.js',
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: PATH.resolve(JS_ASSETS_DIR, '[name].manifest.json'),
        }),
        // new UglifyJsPlugin({extractComments: true}),
        // new OptimizeJsPlugin({sourceMap: false})
    ],
};

module.exports = config;
