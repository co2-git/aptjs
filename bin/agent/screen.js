module.exports = function () {
  var $ = require,
    _ = $('./_');

  console.log(_.pkg.name, 'v' + _.pkg.version);

  function getHttpStatus () {
    $('./lib/get-http-status')(function (error, status, pid) {
      if ( error ) {
        throw error;
      }

      console.log('http status', (status ? 'up'.green : 'down'.red), 'pid', pid);
    });
  }

  function getMongoDbStatus () {
    $('./lib/get-mongodb-status')(function (error, status, pid) {
      if ( error ) {
        throw error;
      }

      console.log('mongodb status', (status ? 'up'.green : 'down'.red), 'pid', pid);
    });
  }

  getHttpStatus();
  getMongoDbStatus();
};