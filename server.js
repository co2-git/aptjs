/* Get dependencies */

var $ =  require;

$('colors');

var express = $('express');
var http = $('http');
var path = $('path');
var packagejson = $('./package.json');

/* Start Express */
var app = express();

app.locals.app = {
  title: (packagejson.config && packagejson.config.title) || packagejson.name || "tapes"
};

app.locals.env = app.get('env');

app.set('port', process.env.PORT || 46352)

/* Template engine */
app.set('view engine', 'jade');

/* Views location */
app.set('views', path.join(__dirname, 'views'));

/* Logger */
app.use(express.logger('dev'));

/* Automatically encode/decode URL */
app.use(express.urlencoded());

/* Automatically encode/decode URL */
app.use(express.json());

app.use(express.cookieParser(Math.random()));


/* Use our routes */
app.use(app.router);

/* Use static server */
app.use(express.static(path.join(__dirname, 'public')));

/* Error */
app.use($('./middlewares/error')(app));

/* Not found */
app.use($('./middlewares/not-found')(app));

/* SESSION */

app.locals.session = {};

app.locals.conns = [];

app.locals.getConn = function () {
  return app.locals.conns[0].db;
};

app.locals.models = {};

/*
 * ============================================================
 * ROUTES
 * ============================================================
 */

/* PARTIALS */
app.get('/partials/:partial',
  $('./routes/partials')(app)
);

/* LANDING PAGE */
app.get('/',
  $('./routes/index')(app)
);

/* Start HTTP server */
var server = http.createServer(app).listen(app.get('port'), function () {
  console.log(('Server started on port ' + app.get('port')).green);
});

/* Start Socket Server */
$('./lib/socket/socket')(server, app);

process.on('exit', function () {
  
});

function connect () {
  if ( ! app.locals.conns.length ) {
    $('./lib/mongo/connect')(function (error, db) {
      setTimeout(connect, 1000);

      if ( error ) {
        return console.error(error);
      }
      app.locals.conns.push({
        db: db,
        uptime: +new Date(),
        models: {},
        getModel: function (model, callback) {
          if ( this.models[model] ) {
            return callback(null, this.models[model]);
          }

          $('./lib/mongo/get')(this.db, 'models',
            {
              name: model
            },

            function (error, models) {
              if ( error ) {
                return callback(error);
              }

              this.models[this.model] = models[0];

              callback(null, models[0]);

            }.bind({ model: model, models: models }));
        }
      });
    });
  }
};

connect();
