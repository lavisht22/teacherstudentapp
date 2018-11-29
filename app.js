const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./app/controllers/index');
const { MONGODB_URI } = require('./config');

mongoose.connect(MONGODB_URI);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/tsfa/api/v1/', indexRouter);

app.use('/tsfa/api/v1/', (req, res) => {
  res.status(404).json({
    info: `Cannot ${req.method}: '${req.path}`,
  });
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
