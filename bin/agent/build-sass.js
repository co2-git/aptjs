module.exports = function (callback) {
  var $ = require,
    _ = $('./_');
    
	var sass = $('node-sass');

  sass.render({
    file: $('path').join(_.path, 'public', 'css', 'main.scss'),
    success: function (css) {
      $('fs').writeFile($('path').join(_.path, 'public', 'css', 'main.css'),
        css, { encoding: 'utf-8' }, function (error) {
          if ( error ) {
            return callback(error);
          }
          callback();
        });
    },
    error: function (error) {
      return callback(error);
    },
    outputStyle: 'compressed'
  });
}