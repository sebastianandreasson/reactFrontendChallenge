var webpack = require("webpack");
var path = require("path");
var loaders = require("./webpack.loaders");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var WebpackCleanupPlugin = require("webpack-cleanup-plugin");

var loaders = [
	{
		test: /\.jsx?$/,
		exclude: /(node_modules|bower_components)/,
		loaders: ["react-hot", "babel"],
	},
	{
		test: /\.css$/,
		loaders: [
			"style?sourceMap",
			"css-loader?minimize&modules&localIdentName=[name]_[local]_[hash:base64:3]"
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
		"./src/app.jsx",
	],
	output: {
		path: path.join(__dirname, "public"),
		filename: "[chunkhash].js",
	},
	resolve: {
		extensions: ["", ".js", ".jsx"],
	},
	module: {
		loaders,
	},
	plugins: [
		new WebpackCleanupPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: ""production"",
			},
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				drop_console: true,
				drop_debugger: true,
			},
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new ExtractTextPlugin("[contenthash].css", {
			allChunks: true,
		}),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			title: "Webpack App",
		}),
	],
};
