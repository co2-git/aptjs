module.exports = function () {
  var $ = require,
    _ = $('./_');

  var services = ['mongodb', 'http'];

  if ( arguments[0] ) {
    services = [];

    for ( var i in arguments ) {
      services.push(arguments[i]);
    }
  }

  function start (i) {
    if ( services[i] ) {
      $('./start-' + services[i])(function (error) {
        if ( error ) {
          throw error;
        }
        console.log(('service ' + services[i] + ' is up').green);
        start(i+1);
      });
    }
  }

  start(0);
};