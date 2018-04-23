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
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /(node_modules|SendBird.min.js)/,
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
                exclude: /(node_modules)/,
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
