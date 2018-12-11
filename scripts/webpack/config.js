const webpack = require('webpack')
const path = require('path')
const ExtractPlugin = require('mini-css-extract-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, paths) => {
	return {
		mode: env.dev ? 'development' : 'production',
		name: 'client',
		target: 'web',
		entry: {
			main: paths.clientEntry
		},
		output: {
			chunkFilename: env.prod ? '[contenthash].js' : '[name].js',
			filename: env.prod ? '[contenthash].js' : '[name].js',
			path: paths.build,
			publicPath: '/'
		},
		module: {
			strictExportPresence: true,
			noParse: /es6-promise\.js$/,
			rules: [
				{
					test: /\.js$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env', {
									modules: 'commonjs',
									useBuiltIns: 'entry'
								}],
								['@babel/preset-react']
							],
							plugins: [
								['@babel/plugin-proposal-object-rest-spread'],
								['@babel/plugin-proposal-class-properties']
							]
						}
					}
				},
				{
					test: /\.scss$/,
					use: [
						env.dev ? 'style-loader' : ExtractPlugin.loader,
						'css-loader',
						'sass-loader'
					]
				},
				{
					test: /\.sass$/,
					use: [
						env.dev ? 'style-loader' : ExtractPlugin.loader,
						'css-loader',
						{
							loader: 'sass-loader',
							options: {
								indentedSyntax: true
							}
						}
					]
				},
				{
					test: /\.svg$/,
					use: {
						loader: 'url-loader'
					}
				}
			]
		},
		devServer: {
			contentBase: paths.src,
			hot: true,
			host: '0.0.0.0',
			index: 'index.html',
			inline: true,
			disableHostCheck: true,
			historyApiFallback: true
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.IS_DEV': !!env.dev,
				'process.env.IS_PROD': !!env.prod
			}),
			new WriteFilePlugin(),
			new HtmlWebpackPlugin({
				template: paths.template,
				filename: 'index.html'
			}),
			!env.dev && new ExtractPlugin({
				allChunks: true,
				filename: env.prod ? '[contenthash].css' : '[name].css'
			})
		].filter(Boolean)
	}
}
