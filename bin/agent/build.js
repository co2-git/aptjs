module.exports = function () {
  var $ = require,
    _ = $('./_');

  var services = ['sass', 'browserify'];

  if ( arguments[0] ) {
    services = [];

    for ( var i in arguments ) {
      services.push(arguments[i]);
    }
  }

  function build (i) {
    if ( services[i] ) {
      $('./build-' + services[i])(function (error) {
        if ( error ) {
          throw error;
        }
        console.log(('build ' + services[i] + ' ok').green);
        build(i+1);
      });
    }
  }

  build(0);
};