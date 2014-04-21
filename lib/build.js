module.exports = function (options, callback) {
  var $ = require;

  var suite = 'wheezy';

  var buildid = [process.pid.toString(), (+new Date()).toString(), Math.ceil(Math.random().toString() * 1000)].join('-');

  var buildbase = $('path').join($('path').dirname(__dirname), 'builds');

  $('fs').mkdir($('path').join(buildbase, buildid), function (error) {
    if ( error ) {
      return callback(error);
    }
    var spawn = $('child_process')
      .spawn('sudo', [ 'debootstrap',
        '--variant=minbase',
        suite, $('path').join(buildbase, buildid)
      ])
      .on('error', function (error) {
        callback(error);
      })
      .on('exit', function (signal) {
        callback(signal);
      });

    spawn.stdout.on('data', function (data) {
      callback(data.toString());
    });

    spawn.stderr.on('data', function (data) {
      callback(data.toString());
    });
  });
};