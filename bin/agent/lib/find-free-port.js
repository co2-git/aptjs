module.exports = function (callback) {
  var $ = require,
    _ = $('../_');

  var portMin = 4000;
  var portMax = 65535;

  function pingPort(port) {

    if ( port === portMax ) {
      throw new Error('No ports open');
    }

    $('./ping-port')(port, function (error, ping) {
      if ( error ) {
        return callback(error);
      }

      if ( ! ping ) {
        return callback(null, port);
      }

      pingPort(++port);
    });
  }

  pingPort(portMin);
};