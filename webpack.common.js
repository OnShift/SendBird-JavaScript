let path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname + '/src'),
    entry: { widget: ['./js/widget.js'] },
    devServer:
    {
        publicPath: '/build/',
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    allChunks: true,
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader',
                })
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options:
                        {
                            failOnError: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options:
                    {
                        presets: ['env', 'es2015']
                    }
                }
            }
        ]
    },
    plugins: [new ExtractTextPlugin('style.css')]
};
