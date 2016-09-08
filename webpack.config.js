"use strict";
var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "3000";

var loaders = [
	{
		test: /\.jsx?$/,
		exclude: /(node_modules|bower_components)/,
		loaders: ['react-hot', 'babel'],
	},
	{
		test: /\.css$/,
		loaders: [
			"style?sourceMap",
			"css-loader?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]",
		],
	},
	{
	    test: /\.json$/,
	    loader: "json-loader",
	},
	{
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		loader: "file",
	},
	{
		test: /\.(woff|woff2)$/,
		loader: "url?prefix=font/&limit=5000",
	},
	{
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		loader: "url?limit=10000&mimetype=application/octet-stream",
	},
	{
		test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		loader: "url?limit=10000&mimetype=image/svg+xml",
	},
	{
		test: /\.gif/,
		loader: "url-loader?limit=10000&mimetype=image/gif",
	},
	{
		test: /\.jpg/,
		loader: "url-loader?limit=10000&mimetype=image/jpg",
	},
	{
		test: /\.png/,
		loader: "url-loader?limit=10000&mimetype=image/png",
	},
];

module.exports = {
	entry: [
		`webpack-dev-server/client?http://${HOST}:${PORT}`,
		`webpack/hot/only-dev-server`,
		`./src/app.jsx`,
	],
	devtool: process.env.WEBPACK_DEVTOOL || "cheap-module-source-map",
	output: {
		path: path.join(__dirname, "public"),
		filename: "bundle.js",
	},
	resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".json"],
	},
	module: {
		loaders,
	},
	devServer: {
		contentBase: "./public",
		hot: true,
		noInfo: true,
		inline: true,
		historyApiFallback: true,
		port: PORT,
		host: HOST,
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
	],
};
