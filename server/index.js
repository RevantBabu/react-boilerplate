/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');
const MongoClient = require('mongodb').MongoClient;
const dburl = "mongodb://132.145.162.19:27017/";

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

app.get('/api/users/:username', (req, res) => {
  users = [{ name: 'u1', pos: 5, neg: 1 }, { name: 'u2', pos: 15, neg: 17 }];

  MongoClient.connect(dburl, function(err, db) {
    if (err) throw err;
    var dbo = db.db("maindb");
    console.log(req.params.username);
    var query = {"name": {$regex: req.params.username, $options:"i"}};//{"name": req.params.username};
    dbo.collection("users").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});

app.post('/api/addusers/:username', (req, res) => {
  MongoClient.connect(dburl, function(err, db) {
    if (err) throw err;
    var dbo = db.db("maindb");
    console.log(req.params.username);
    var query = { "name": req.params.username };
    dbo.collection("users").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      if ((result || []).length > 0) {
        res.send({"userExists": true, "userCreated": false});
      } else {
        dbo.collection("users").insertOne({"name": req.params.username, "sentimets": []}, function(err, res1) {
          if (err) throw err;
          res.send({"userCreated": true, "name": req.params.username});
        });
      }
      db.close();
    });
  });
});

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
