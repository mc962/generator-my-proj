/* eslint-disable @typescript-eslint/no-var-requires */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const webpackConfig = {
    mode: process.env.NODE_ENV,
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }, {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },
    devServer: {
        contentBase: 'dist'
    },
    resolve: {
        extensions: ['.ts', '.js', ".css"]
    },
    output: {
        path: `${__dirname}/dist`,
        filename: 'index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: 'src/index.html'
        }),
    ],
    devtool: 'eval-source-map'
};

// Only setup/run bundle analyzer if analysis is desired
if (process.env.ANALYZE) {
    webpackConfig.plugins.push(
        new BundleAnalyzerPlugin()
    )
}

// wrap Webpack configuration in SpeedMeasurePlugin to measure build speeds
const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap(webpackConfig);