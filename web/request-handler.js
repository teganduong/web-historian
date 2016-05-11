var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {
    var filePath = url.parse(req.url).pathname;
    var route = req.url === '/' ? '/index.html' : filePath;
    console.log('==>>>> route: ', route);
    console.log('==>>++>> req.url: ', req.url);

    return utils.serveAssets(res, route, function(content) {
      if (content) {
        utils.respond(200, content, res);
      }
      utils.respond(404, 'Not Found', res);
    });
  }

  res.end(archive.paths.list);
};
