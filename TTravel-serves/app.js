var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var personal_center = require('./routes/personal-center');
var scenic = require('./routes/scenic');
var strategys = require('./routes/strategy');
var admin = require('./routes/admin');
// var url = ['http://localhost:8000','http://localhost:4200']

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*',function (req, res, next) {
  if( req.headers.origin == 'http://localhost:8000' || req.headers.origin == 'http://localhost:4200'
    || req.headers.origin == 'http://localhost'){
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild,token');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials",true);
    if (req.method == 'OPTIONS') {
      res.sendStatus(200); //让options请求快速返回/
    }
    else {
      next();
    }
  }
});

app.use('/index', index);
app.use('/personal-center', personal_center);
app.use('/users', users);
app.use('/scenic',scenic);
app.use('/strategy',strategys);
app.use('/admin',admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
