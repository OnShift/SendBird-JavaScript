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
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
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
    }
};
