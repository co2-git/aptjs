module.exports = function (buildid, callback) {
  var $ = require;

  var buildbase = $('path').join($('path').dirname(__dirname), 'builds');

  var spawn = $('child_process')
    .spawn('sudo', [ 'genisoimage',
      '-o', 'builds/' + buildid + '.iso',
      $('path').join(buildbase, buildid)
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
};