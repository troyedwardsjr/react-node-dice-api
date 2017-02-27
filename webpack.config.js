var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'client/js/index.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
		extensions: ['', '.js', '.jsx']
	},
  module: {
    loaders: [
      {
        test: /\.js(x|)?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'client')
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap'
        ]
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      { 
        test: /\.(jpe?g|png|gif|svg)$/, 
        loader: 'url', 
        query: {limit: 10240} 
      },
      { 
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, 
        loader: "url-loader?mimetype=application/font-woff" 
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, 
        loader: "file-loader?name=[name].[ext]" 
      },
    ]
  }
};
