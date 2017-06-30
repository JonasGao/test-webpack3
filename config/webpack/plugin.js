'use strict';
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const env = require('./env');

const dllDir = env.dllDir;

const plugins = [
    new webpack.DllReferencePlugin({
        context: env.workDir,
        manifest: require(`${dllDir}/vendor-manifest.json`)
    }),
    new ExtractTextWebpackPlugin('[name]-[hash].bundle.css'),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons'
    }),
    new HtmlWebpackPlugin({
        filename: 'app.html',
        template: 'src/app.html',
        inject: true
    }),
    new AddAssetHtmlPlugin([
        {
            filepath: require.resolve(`${dllDir}/vendor.bundle.js`),
            includeSourcemap: env.isDev
        }, {
            filepath: require.resolve(`${dllDir}/vendor.bundle.css`),
            includeSourcemap: env.isDev,
            typeOfAsset: 'css'
        }
    ]),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
];

if (env.isDev) {
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    );
} else {
    const PrepackWebpackPlugin = require('prepack-webpack-plugin');

    plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new PrepackWebpackPlugin({})
    );
}

module.exports = plugins;
