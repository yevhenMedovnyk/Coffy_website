const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CssMqpackerPlugin = require('css-mqpacker-webpack-plugin');
//const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");






//const { isDataView } = require('util/types');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;



module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: './index.js',
	output: {
		clean: true,
		filename: `./js/${filename('js')}`,
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: 'images/[name].[hash][ext][query]',
	},
	devtool: isProd ? false : 'source-map',
	devServer: {
		historyApiFallback: true,
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		compress: true,
		port: 8080,
		hot: true,
		open: true,
	},
	plugins: [
		new CssMqpackerPlugin(),
		new CssMinimizerPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/other'),
					to: path.resolve(__dirname, 'dist/other'),
					noErrorOnMissing: true,
				}
				//{ from: "other", to: "public" },
			],
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			filename: 'index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new MiniCssExtractPlugin({
			filename: `./style/${filename('css')}`,
		}
		),
	],
	module: {

		rules: [
			{
				test: /\.html$/i,
				loader: "html-loader",
				//type: 'asset/resource',
			},

			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
			},

			{
				test: /\.(png|jpg|gif|svg)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(ttf|eot|woff2?)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext][query]'
				},
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",

				}
			},
		],
	},
	optimization: {
		minimizer: [
			// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
			`...`,
			new CssMinimizerPlugin(),
			new CssMqpackerPlugin({
				sort: function (a, b) {
					return b.localeCompare(a);
				}
			}),
		],
	},
	//optimization: {
	//	//minimize: true,
	//	minimizer: [
	//		new CssMqpackerPlugin({
	//			sort: function (a, b) {
	//				return b.localeCompare(a);
	//			}
	//		}),
	//	],
	//},
};