(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {
  return {
    restrict: 'A', // only activate on element attribute
    
    require: '?ngModel', // get a hold of NgModelController
    
    link: function(scope, element, attrs, ngModel) {
      if(!ngModel) return; // do nothing if no ng-model

      // Specify how UI should be updated
      ngModel.$render = function() {
        element.html(ngModel.$viewValue || '');
      };

      // Listen for change events to enable binding
      element.on('blur keyup change', function() {
        scope.$apply(read);
      });
     
      read(); // initialize

      // Write data to the model
      function read() {
        var html = element.html();
        // When we clear the content editable the browser leaves a <br> behind
        // If strip-br attribute is provided then we strip this out
        if( attrs.stripBr && html == '<br>' ) {
          html = '';
        }
        ngModel.$setViewValue(html);
      }
    }
  };
}

},{}],2:[function(require,module,exports){
$(document).foundation();

var ngModule = angular.module('aptjs', ['ngRoute']);

ngModule.factory({
  Socket: require('./services/socket'),
  Flash: require('./services/flash')
});

ngModule.directive({
  contenteditable: require('./directives/contenteditable')
});

ngModule.config([
	'$routeProvider',

  '$locationProvider',
  
  function (  $routeProvider,     $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider

      .when('/install', {
        template: 'Installing what?'
      });

    $routeProvider
      .otherwise({
        template: 'Hello'
      });
  }]);

ngModule.run(function ($rootScope) {
  
});
},{"./directives/contenteditable":1,"./services/flash":3,"./services/socket":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
},{}]},{},[2])