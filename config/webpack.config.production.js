
import path from 'path';
import webpack from 'webpack';
import config from './index';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import baseConfig from './webpack.config.base';

export default {

    ...baseConfig,

    mode: 'production',
    devtool: false,

    entry: [
        'babel-polyfill',
        `${config.client}/app.js`,
    ],

    output: {
        path: `${config.dist}/src`,
        filename: 'app.js'
    },

    optimization: {
        minimize: true
    },

    plugins: [
        // https://github.com/webpack/webpack/issues/2545
        // Use babel-minify-webpack-plugin minify code
        // new MinifyPlugin(),

        // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
        // https://github.com/webpack/webpack/issues/864
        new webpack.optimize.OccurrenceOrderPlugin(),

        new CopyWebpackPlugin([
            {
                from: `${config.assets}/fonts/**/*`,
                to: config.dist,
            },
            {
                from: `${config.assets}/images/**/*`,
                to: config.dist,
            },
            {
                from: path.resolve(__dirname, '../package.json'),
                to: config.dist,
            },
            {
                from: path.resolve(__dirname, '../locales/*'),
                to: config.dist,
            },
        ]),

        new HtmlWebpackPlugin({
            filename: `${config.dist}/src/index.html`,
            template: './src/index.html',
            inject: false,
            hash: true,
            minify: {
                collapseWhitespace: true
            }
        })
    ],

    // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
    target: 'web'
};
