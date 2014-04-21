var $ = require;

function readMe (callback) {
  $('fs').readFile($('path').join($('path').dirname(__dirname), 'README.md'),
    { encoding: 'utf-8' }, callback);
}

switch ( process.argv[2] ) {
  default:
    readMe(function (error, md) {
      if ( error ) {
        throw error;
      }
      console.log(md);
    });
    break;

  case 'build':
    $('../lib/build')(
      {
        suite: 'wheezy'
      },
      function (error) {
        console.log(arguments);
      }
    );
    break;

  case 'mkiso':
    $('../lib/mkiso')(process.argv[3], function (error) {
      console.log(arguments);
    });
    break;
}