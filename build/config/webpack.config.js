'use strict';

const PATH = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const ROOT = '../../';

const CACHE_DIR_PATH = PATH.resolve(__dirname, ROOT, '.cache/');
const NODE_MODULES = PATH.resolve(__dirname, ROOT, 'node_modules/');

const SRC_DIR = PATH.resolve(__dirname, ROOT, 'src/app/client/');
const INDEX_JS_FILE = PATH.resolve(SRC_DIR, 'index.js');
const INDEX_HTML_FILE = PATH.resolve(SRC_DIR, 'index.html');

const JS_DIR_NAME = 'js';
const PUBLIC_PATH = `/${JS_DIR_NAME}/`;
const PUBLIC_DIR = PATH.resolve(__dirname, ROOT, 'dist/');
const JS_ASSETS_DIR =  PATH.resolve(PUBLIC_DIR, `${JS_DIR_NAME}/`);

const config = {
    entry: {
        app: [
            'react-hot-loader/patch',
            INDEX_JS_FILE
        ]
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[id].[name].js',
        path: JS_ASSETS_DIR,
        publicPath: PUBLIC_PATH
    },
    cache: true,
    devServer: {
        stats: {
            assets: true,
            cached: false,
            cachedAssets: false,
            children: false,
            chunks: false,
            chunkModules: false,
            colors: true,
            hash: false,
            modules: false,
            reasons: false,
            source: false,
            timings: false,
            version: false
        },
        hot: true,
        port: 3030,
        contentBase: PUBLIC_DIR,
        publicPath: PUBLIC_PATH,
        compress: true,
        watchOptions: {
            ignored: [NODE_MODULES]
        },
        historyApiFallback: true,
        watchContentBase: true
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: PATH.resolve(JS_ASSETS_DIR, 'vendor.manifest.json'),
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
            columns: false
        }),
        new HtmlWebpackPlugin({
            hash: false,
            filename: '../index.html',
            cache: true,
            inject: false,
            template: INDEX_HTML_FILE
        })
    ],
    module: {
        rules: [
            {
                test: /(\.scss|\.css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[name]__[local]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => [autoprefixer({browsers: ['last 2 Chrome versions']})]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            outputStyle: 'expanded'
                        }
                    }
                ],
                include: SRC_DIR,
                exclude: [NODE_MODULES]
            },
            {
                test: /\.js$/,
                include: SRC_DIR,
                exclude: [NODE_MODULES],
                use: [{
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: CACHE_DIR_PATH
                    }
                }, {
                    loader: 'eslint-loader'
                }]
            }
        ]
    }
};

module.exports = config;
