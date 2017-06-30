'use strict';

const path = require('path');

const workDir = path.join(__dirname, '../../');

const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
    process.env.NODE_ENV = 'development';
    console.log('当前环境为：', process.env.NODE_ENV);
}

module.exports = {
    workDir: workDir,
    dllDir: path.resolve(workDir, 'tmp'),
    isDev
};
