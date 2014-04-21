module.exports = function (filter) {
  var query = {};

  if ( typeof filter === 'string' ) {
    filter = { _id: filter };
  }

  for ( var key in filter ) {
    if ( key === '_id' ) {
      if ( typeof filter[key] === 'string' ) {
        query._id = require('mongodb').ObjectID(filter[key]);
      }
      else if ( filter[key].constructor.name === 'ObjectID' ) {
        query._id = filter[key]
      }
    }
  }

  return query;
};
