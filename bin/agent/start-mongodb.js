module.exports = function (callback) {
  var $ = require,
    _ = $('./_');

  $('./lib/get-mongodb-status')(function (error, up) {
    if ( error ) {
      return callback(error);
    }

    if ( up ) {
      return callback(new Error('MongoDB Already running'));
    }

    if ( process.env.MONGODB_PORT ) {
      spawn(process.env.MONGODB_PORT);
    }

    else {
      $('./lib/find-free-port')(function (error, port) {
        if ( error ) {
          return callback(error);
        }

        spawn(port);
      });
    }
  });

  function spawn (port) {
    var spawn = $('child_process').spawn(
      $('path').join(_.path, 'dependencies', 'bin', 'mongod'),
      ['--port', port, '--dbpath', $('path').join(_.path, 'data')],
      {
        detached: true
      });

    var out;

    spawn.on('error', function (error) {
      callback(error);
    });

    spawn.stdout.on('data', function (data) {
      if ( data.toString().match('waiting for connections on port ' + port) ) {
        $('fs').writeFile($('path').join(_.path, 'mongod.port'), port.toString(),
          { encoding: 'utf-8' }, function (error) {
            if ( error ) {
              return $('./stop-mongo', function (error) {
                if ( error ) {
                  return callback(error);
                }
                callback(new Error('Can not save port'));
              });
            }

            callback();
          });
      }
    });
  }

  // 
};