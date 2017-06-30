'use strict';
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const env = require('./env');

function resolve(dir) {
    return path.join(env.workDir, dir);
}

let rules = [
    {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    },
    {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
            formatter: require('eslint-friendly-formatter')
        }
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
    },
    {
        test: /\.html$/,
        loader: 'html-loader',
        include: [resolve('src')],
        options: env.isDev ? '' : {
            minimize: true,
            removeComments: true,
            collapseWhitespace: true
        }
    },
    {test: /\.(gif|png)$/, loader: 'url-loader'},
    {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'}
];

if (env.isDev) {
    rules.push({
        test: /\.css$/,
        loader: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
        })
    }, {
        test: /\.less$/,
        loader: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'less-loader']
        })
    });
} else {
    rules.push({
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader?minimize=true&importLoaders=1',
                'postcss-loader'
            ]
        })
    }, {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader?minimize=true&importLoaders=1',
                'postcss-loader',
                'less-loader'
            ]
        })
    });
}

module.exports = rules;
