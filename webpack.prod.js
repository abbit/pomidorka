const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = merge(commonConfig, {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new WorkboxPlugin.InjectManifest({
			swSrc: './src/service_worker.js',
			swDest: 'sw.js',
		}),
	],
});
