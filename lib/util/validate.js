var r = require;

module.exports = function validate(value, expected) {
  if ( r('util').isArray(value) && typeof expected === 'undefined' ) {
    return value.forEach(function (v) {
      validate(v[0], v[1]);
    });
  }

  if ( typeof expected === 'string' ) {
    if ( value.constructor.name !== expected ) {
      throw new Error('value should be an instance of ' + expected +
        ', got ' + value.constructor.name);
    }
  }

  if ( typeof expected === 'function' ) {
    if ( expected === null ) {
      if ( value !== null ) {
        throw new TypeError('value should be null' +
          ', got ' + value.constructor.name);
      }
    }

    else if ( value.constructor !== expected ) {
      console.log(value, value.constructor.name);
      throw new TypeError('value should be of ' + expected.name +
        ', got ' + value.constructor.name);
    }
  }

  if ( typeof expected === 'object' ) {
    if ( r('util').isArray(expected) ) {
      var ok = 0;

      expected.forEach(function (x) {
        try {
          validate(value, x);
          ok ++;
        }
        catch ( error ) {
        }
      });

      if ( ! ok ) {
        throw new Error('value did not match any of the suggestions');
      }
    }
  }
}