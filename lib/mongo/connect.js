module.exports = function libCoreMongoConnect (callback) {
  if ( typeof callback !== 'function' ) {
    return callback(new TypeError('Missing callback'));
  }

  var cfg = require('../../package.json').config.mongodb;

  var port = cfg.port || process.env.MONGODB_PORT;

  if ( ! port ) {
  	return callback(new Error('Missing MongoDB Port'));
  }

  var client = require('mongodb').MongoClient;
  var format = require('util').format;

  client.connect('mongodb://' + cfg.host + ':' + port + '/' + cfg.database, callback);
};