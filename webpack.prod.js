let path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    output: {
        path: path.resolve(__dirname + '/build'),
        filename: '[name].SendBird.js',
        publicPath: 'build',
        library: 'onshiftChatWidget',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devtool: 'none'
});
