let path = require('path');

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
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"},
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                options: {
                    limit: 10 * 1024
                }
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
    }
};
