let path = require('path');

module.exports = {
    context: path.resolve(__dirname + '/src'),
    entry: { widget: ['./js/mount.js'] },
    output:
    {
        path: path.resolve(__dirname + '/build'),
        filename: '[name].SendBird.js',
        publicPath: "build"
    },
    devtool: "cheap-eval-source-map",
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
            { // ESLint
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
            { // ES6
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
