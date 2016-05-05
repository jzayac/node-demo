/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack/webpack.config.js');
const httpProxy = require('http-proxy');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = 3000;
const app = express();

const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:3030',
  ws: true
});


app.use('/api', (req, res) => {
  console.log('proxy------------------');
  console.log(req.body);
  proxy.web(req, res);
});

proxy.on('error', (error, req, res) => {
  var json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }
  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../static/index.html')));
    res.end();
  });
} else {
  app.use(express.static(path.join(__dirname, '../static/dist')));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, '../static/dist/index.html'));
  });
}



app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
