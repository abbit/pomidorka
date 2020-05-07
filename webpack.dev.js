/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');

const dist = join(__dirname, 'dist');

module.exports = merge(commonConfig, {
	mode: 'development',
	plugins: [new webpack.HotModuleReplacementPlugin()],
	devServer: {
		contentBase: dist,
		port: process.env.PORT || 5000,
		historyApiFallback: true,
		compress: false,
		inline: true,
		hot: true,
		host: '192.168.0.101',
	},
});
