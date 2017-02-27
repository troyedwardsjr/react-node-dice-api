var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');
var app = express();
var compiler = webpack(config);
var routes = require('./server/routes');
var bodyParser = require('body-parser');

// Webpack
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
}));
app.use(require('webpack-hot-middleware')(compiler));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serialization middleware.
app.use(bodyParser({ limit: '5mb' }));
app.use(bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' }));

// Routes.
app.use('/', routes);

// CORS
app.all('*', function(req, res, next) {
     var origin = req.get('origin'); 
     res.header('Access-Control-Allow-Origin', origin);
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
});

// Server
app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:3000/');
});

