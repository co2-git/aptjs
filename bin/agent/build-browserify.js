module.exports = function (callback) {
  var $ = require,
    _ = $('./_');
    
  var browserify = $('browserify');

  var b = browserify();
  
  b.add($('path').join(_.path, 'public', 'js', 'index.js'));

  var src = $('fs').createWriteStream($('path').join(_.path, 'public', 'bundle.js'));

  b.bundle().pipe(src);

  callback();
};