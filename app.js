const getEnv = require('./config_env');
require('dotenv').config({path: getEnv() /*(process.env.NODE_ENV === 'development') ? `./.env.development` : `./.env.production` ((process.env.NODE_ENV === 'production') ? `./.env.production` : `./.env`) */});

require('./mongoose_connect');
require('./passport_config');

var createError = require('http-errors');
var app = require('./app_settings');

let port = process.env.PORT;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
