var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');

exports.headers = headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  fs.readFile(archive.paths.siteAssets + asset, 'utf8', function(err, data) {
    console.log('===+++++ archive.paths.siteAssets: ', archive.paths.siteAssets);
    if (err) {
      fs.readFile(archive.paths.archivedSites + asset, 'utf8', function(err, data) {
        console.log('$$$$$$$ data from serving archivedSites: ', data);
        if (err) { 
          console.error('Error in serving assets: ', err); 
          respond(404, 'Not found', res);
        }
        callback(data);
      });
    }
    console.log('+++++++ data from serving index.html: ', data);
    callback(data);
  });
};



// As you progress, keep thinking about what helper functions you can put here!

exports.respond = respond = function(statusCode, data, res) {
  res.writeHead(statusCode, headers);
  res.end(data);
};

exports.collectData = function(req, callback) {
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', function() {
    callback(data);
  });
};
