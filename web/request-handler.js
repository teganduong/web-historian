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
      utils.respond(200, content, res);
      console.log('******** content: ', content);
      return content;
    });
  }

  res.end(archive.paths.list);
};
