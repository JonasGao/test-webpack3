'use strict';
const path = require('path');
const env = require('./env');

const WORK_DIR = env.workDir;

const webpackConfig = {
    context: WORK_DIR,
    entry: {
        app: './src/app',
    },
    output: {
        path: path.join(WORK_DIR, '/dist'),
        filename: '[name]-[hash].bundle.js'
    },
    module: {
        rules: require('./rules')
    },
    plugins: require('./plugin')
};

if (env.isDev) {
    webpackConfig.devtool = 'source-map';
    webpackConfig.devServer = {
        /*
         * 在 dev 服务上启用热替换
         */
        hot: true,
        contentBase: [
            path.join(WORK_DIR, 'src'),
            path.join(WORK_DIR, 'dist')
        ],
        compress: true,
        port: 9000
    };
}

module.exports = webpackConfig;
