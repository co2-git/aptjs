module.exports = function MongoRemove (db, collection, find, callback) {
  var $ = require;

  try {
    $('../util/validate')([
      [ db,           'Db' ],
      [ collection,   String],
      [ find,         [String, Object]],
      [ callback,     Function]
    ]);

    db.collection(collection)
      .remove($('./parse-filter')(find), callback);
  }

  catch ( error ) {
    callback(error);
  }
};
