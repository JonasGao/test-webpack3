'use strict';
const path = require('path');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const env = require('../env');
const _ = require('lodash');

const workDir = env.workDir;
const dllDir = env.dllDir;

module.exports = {
    context: workDir,
    entry: {
        vendor: [
            'jquery',
            'angular',
            'lodash',
            'angular-block-ui/dist/angular-block-ui',
            'angular-block-ui/dist/angular-block-ui.css',
            'angular-translate',
            'angular-ui-bootstrap',
            'bootstrap/less/bootstrap.less',
            'animate.css',
            'font-awesome/css/font-awesome.css',
            '@uirouter/angularjs'
        ]
    },
    output: {
        path: dllDir,
        filename: '[name].bundle.js',
        library: '[name]_[hash]'
    },
    module: {
        rules: require('../rules')
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.DllPlugin({
            path: path.join(dllDir, '[name]-manifest.json'),
            name: '[name]_[hash]'
        }),
        new ExtractTextWebpackPlugin('[name].bundle.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: !env.isDev && {
                warnings: false
            },
            sourceMap: env.isDev
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    devtool: env.isDev && 'source-map'
};
