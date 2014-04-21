module.exports = function () {
  function displayMessage(msg) {
    if ( typeof msg === 'string' ) {
      return msg;
    }

    switch ( typeof '' ) {
      case typeof msg:
        return msg;

      case typeof msg.message:
        return msg.message;

      case typeof msg.code:
        return msg.code;
    }

    return 'Unknown error';
  }

  return {
    error: function (message) {
      var alert = $('<div data-alert class="alert-box alert"><big></big><code></code><a class="close">&times;</a></div>');

      alert.find('big').text(displayMessage(message));

      $('.flash').append(alert);
    },


    success: function (message) {
      var alert = $('<div data-alert class="alert-box success"><big></big><code></code><a class="close">&times;</a></div>');

      alert.find('big').text(displayMessage(message));

      if ( message.debug ) {
        //alert.find('code').text(message.debug.toString());
      }

      $('.flash').append(alert);
    }
  };
};
