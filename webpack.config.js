var path = require('path');

module.exports = {
	devtool: 'source-map',
	entry: {
		app1: ['./src/app1/main.ts'],
		app2: ['./src/app2/main.ts']
	},
	resolve: {
		extensions: ['.webpack.js', '.ts', '.js']
	},
	module: {
		loaders: [{
	        test: /\.ts$/,
			loader: 'ts-loader',
			exclude: '/node_modules'
		}]
	},
	output: {
		path: path.resolve(__dirname, 'web'),
		filename: '[name].bundle.js'
	}
};
