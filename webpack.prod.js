/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const WorkboxPlugin = require('workbox-webpack-plugin');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new WorkboxPlugin.InjectManifest({
			swSrc: './src/service_worker.ts',
			swDest: 'sw.js',
		}),
	],
});
