#! dependencies/bin/node

var $ = require;

$('colors');

$('./agent/_').pkg = $('../package.json');
$('./agent/_').path = $('path').dirname(__dirname);

switch ( process.argv[2] ) {
  case undefined:
  case 'status':
    $('./agent/screen')();
    break;

  default:
    console.log(('Unknown action: ' + process.argv[2].bold).yellow);
    break;

  case 'start':
    $('./agent/start')();
    break;

  case 'start-http':
    $('./agent/start')('http');
    break;

  case 'start-mongodb':
    $('./agent/start')('mongodb');
    break;

  case 'restart':
    $('./agent/restart')();
    break;

  case 'restart-http':
    $('./agent/restart')('http');
    break;

  case 'restart-mongodb':
    $('./agent/restart')('mongodb');
    break;

  case 'stop':
    $('./agent/stop')();
    break;

  case 'stop-http':
    $('./agent/stop')('http');
    break;

  case 'stop-mongodb':
    $('./agent/stop')('mongodb');
    break;

  case 'build':
    $('./agent/build')();
    break;
}