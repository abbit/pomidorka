/* eslint-disable */

const { merge } = require('webpack-merge');
const WorkboxPlugin = require('workbox-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isAnalyze = process.env.BUNDLE_ANALYZE === true;

const plugins = [
	new WorkboxPlugin.InjectManifest({
		swSrc: './src/service_worker.ts',
		swDest: 'sw.js',
	}),
];

if (isAnalyze) {
	plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(commonConfig, {
	mode: 'production',
	devtool: '',
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	plugins,
});
