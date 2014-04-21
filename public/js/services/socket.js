module.exports = function () {
  var socket = io.connect(location.protocol + '//' + location.hostname + ':' + location.port);

  return {
    emit: function (query, options, callback) {
      return socket.emit(query, options, callback);
    },

    on: function (event, callback) {
      return socket.on(event, callback);
    }
  };
};