/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const { join, resolve } = require('path');
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const dist = join(__dirname, 'dist');

module.exports = {
	entry: {
		app: './src/index',
	},
	resolve: {
		extensions: ['.js', '.json', '.ts', '.tsx'],
		modules: [resolve(__dirname, 'node_modules'), 'node_modules'],
	},
	output: {
		path: dist,
		filename: '[name].[hash].js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/env',
							['@babel/typescript', { jsxPragma: 'h' }],
							['@babel/react', { jsxPragma: 'h' }],
						],
						plugins: [
							'@babel/proposal-class-properties',
							'@babel/proposal-object-rest-spread',
							['transform-react-jsx', { pragma: 'h' }],
						],
					},
				},
			},
			{
				test: /\.(sass|scss)$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [autoprefixer()],
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								includePaths: [join(__dirname, 'src')],
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanPlugin(),
		new CopyPlugin([{ context: 'src/static/', from: '**/*.*', to: dist }]),
		new HtmlPlugin({ template: './src/index.html' }),
	],
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			name: 'vendor',
		},
	},
};
