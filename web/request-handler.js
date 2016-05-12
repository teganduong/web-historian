var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');
var url = require('url');
var request = require('request');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {
    var filePath = url.parse(req.url).pathname;
    var route = filePath === '/' ? '/index.html' : filePath;

    utils.serveAssets(res, route, function(content) {
      if (content) {
        utils.respond(200, content, res);
      } else {
        utils.respond(404, 'Not Found', res);
      }
    });
  }

  if (req.method === 'POST') {

    return utils.collectData(req, function(data) {
      var site = data.split('=')[1];
      archive.addUrlToList(site, function() {
        utils.respond(302, data, res);
      });
    });
  }

};
