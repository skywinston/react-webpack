const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, '/app/javascripts/'),
    build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

const common = {
    entry: PATHS.app,
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'node_modules/html-webpack-template/index.html', // path to our own template if needed
            title: 'Style Guide',
            appMountId: 'app'  // will provide a div with an id of 'app' for us to mount the main component to
        })
    ],
    module: {
        loaders: [
            {
                // These tests expect a RegEx
                test: /\.css$/,
                loaders: ['style', 'css'],
                // Include expects a path or an array of paths
                include: PATHS.app
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.jsx?$/,
                // Enable caching for improved perf during development (uses default OS directory w/o add'n config)
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015', 'survivejs-kanban']
                },
                include: PATHS.app,
                exclude: '/node_modules/'
            }
        ]
    }
};

// Default configuration

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // Display only errors to reduce the amount of output
            stats: 'errors-only',

            // Parse host & port from env to make customization easier
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        devtool: 'eval-source-map' // 'eval' is faster & more suitable for large projects
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {});
}