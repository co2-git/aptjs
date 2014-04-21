module.exports = function (port, callback) {
  var $ = require,
    _ = $('../_');

  var spawn = $('child_process').spawn('nc', ['-zv', '-w30', 'localhost', port],  {});

  spawn.on('error', callback);

  spawn.on('exit', function (signal) {
    if ( typeof signal === 'number' ) {
      return callback(null, !signal);
    }
  });
};