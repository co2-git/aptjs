module.exports = function MongoUpdate (db, collection, filter, update, callback) {

  var $ = require;
  
  try {
    $('../util/validate')([
      [db, 'Db'],
      [collection, String],
      [filter, [String, Object, null]],
      [update, [Object]],
      [callback, Function]
    ]);

    db.collection(collection)
      .update($('./parse-filter')(filter), update, callback);
  }
  
  catch ( error ) {
    callback(error);
  }
};
