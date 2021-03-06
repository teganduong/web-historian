var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  return fs.readFile(exports.paths.list, 'utf8', function(err, urls) {
    if (err) { console.error('Error in reading list of urls: ', err); }
    return callback ? callback(urls.split('\n')) : urls.split('\n');
    
  });
};

exports.isUrlInList = function(url, callback) {
  return exports.readListOfUrls(function(list) {
    return callback ? callback(_.contains(list, url)) : _.contains(list, url);    
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function() {
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(sites) {
    return callback ? callback(_.contains(sites, url)) : _.contains(sites, url);
  });
};

exports.downloadUrls = function(urlArray) {
  _.each(urlArray, function(url) {
    if (!exports.isUrlArchived(url)) {
      // request module can be combined w/ fs module to stream http requests to and from files
      request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
    }
  });
};
