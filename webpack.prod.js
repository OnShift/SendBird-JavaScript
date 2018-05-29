const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common');
const merge = require('webpack-merge');
const path = require('path');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const OptimizeCssClassNames = require('optimize-css-classnames-plugin');
const Uglify = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
    output: {
        path: path.resolve(__dirname + '/build'),
        filename: '[name].SendBird.js',
        publicPath: 'build',
        library: 'onshiftChatWidget',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devtool: 'none',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new Uglify({
            parallel: true,
            cache: true,
            extractComments: true
        }),
        new OptimizeCss(),
        new OptimizeCssClassNames({
            prefix: '_'
        }),
        new BundleAnalyzer({
            analyzerMode: 'static',
            openAnalyzer: false
        })
    ]
});
