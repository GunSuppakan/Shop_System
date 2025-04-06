var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
require('dotenv').config()
require('./db.js')
var connectDB = require('./db.js')

process.env.DB_HOST

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var authRoutes = require('./routes/authRoutes.js')
var productRoutes = require('./routes/productRoutes.js')
var orderRoutes = require('./routes/orderRoutes.js')
var adminRoutes = require('./routes/adminRoutes.js')

var app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/', usersRouter);

app.use('/api/v1', authRoutes);
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/products', orderRoutes)
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/orders', orderRoutes)

//Connect DB
connectDB();

app.listen(3001, console.log('Running Port 3001'))


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

module.exports = app;
