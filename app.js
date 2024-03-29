var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const usersRouter = require('./app/user/routes');
const dashboardRouter = require('./app/dashboard/routes');
const projectRouter = require('./app/projects/routes');
const categoryRouter = require('./app/category/routes');
const serviceRouter = require('./app/service/routes');
const roleRouter = require('./app/role/routes');
const teamRouter = require('./app/team/routes');
const testimonialRouter = require('./app/testimoni/routes');

// todo import api router
const clientRouter = require('./app/api/client/routes');

const urlAPI = require('./app/api/config');
var app = express();

const cors = require('cors');

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {},
  }),
);
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/adminlte',
  express.static(path.join(__dirname, '/node_modules/admin-lte/')),
);

app.use('/', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/projects', projectRouter);
app.use('/category', categoryRouter);
app.use('/role', roleRouter);
app.use('/teams', teamRouter);
app.use('/testimoni', testimonialRouter);
app.use('/services', serviceRouter);

// todo api
const URL = '/api/v1';
app.use(`${URL}/client`, clientRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
