let path = require('path');

function determineOutput(env) {
    let output = {
        path: path.resolve(__dirname + '/build'),
        filename: '[name].SendBird.js',
        publicPath: 'build',
        library: 'onshiftChatWidget',
    };
    if (env && env.local) {
        output.libraryTarget = 'var';
    } else {
        output.libraryTarget = 'umd';
        output.umdNamedDefine = true;
    }
    return output;
}

function determineConfig(env){
    return {
        context: path.resolve(__dirname + '/src'),
        entry: { widget: ['./js/widget.js'] },
        output: determineOutput(env),
        devtool: env && env.local ? 'eval-source-map' : 'none',
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
}

module.exports = env => {
    return determineConfig(env);
};
