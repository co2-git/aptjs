module.exports = function (callback) {
  var $ = require,
    _ = $('./_');

  $('./lib/get-mongodb-status')(function (error, status, pid) {
    if ( error ) {
      return callback(error);
    }

    if ( ! status ) {
      return callback(new Error('MongoDB server already down'));
    }

    var spawn = $('child_process').spawn(
      $('path').join(_.path, 'dependencies', 'bin', 'mongod'),
      ['--dbpath', $('path').join(_.path, 'data'), '--shutdown']
    );

    spawn.on('error', function (error) {
      callback(error);
    });

    spawn.on('exit', function (signal) {
      if ( typeof signal === 'number' ) {
        if ( signal ) {
          return callback(new Error('Got weird status: ' + signal));
        }
        callback();
      }
    });
  });
};