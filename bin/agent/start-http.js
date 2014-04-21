module.exports = function (callback) {
  var $ = require,
    _ = $('./_');

  $('./lib/get-http-status')(function (error, up) {

    if ( error ) {
      return callback(error);
    }

    if ( up ) {
      return callback(new Error('HTTP Already running'));
    }

    if ( process.env.PORT ) {
      fork(process.env.PORT);
    }

    else {
      $('./lib/find-free-port')(function (error, port) {
        if ( error ) {
          return callback(error);
        }

        fork(port);
      });
    }
  });

  function fork (port) {
    var fork = $('child_process').fork(
      $('path').join(_.path, 'server.js'),
      [],
      {
        env: {
          PORT: port,
          MONGODB_PORT: +($('fs').readFileSync($('path').join(_.path, 'mongod.port'),
            { encoding: 'utf-8' }).trim())
        },
        detached: true
      });

    fork.on('message', function (message) {
      if ( message.connected ) {
        callback();
      }
    });

    $('fs').writeFile($('path').join(_.path, 'lock.pid'), fork.pid.toString(),
      { encoding: 'utf-8' }, function (error) {
        if ( error ) {
          return callback(error);
        }

        $('fs').writeFile($('path').join(_.path, 'http.port'), port.toString(), { encoding: 'utf-8' }, function (error) {
          if ( error ) {
            callback(error);
          }
        })
      });
  }

  // 
};