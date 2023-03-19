var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var homePageRouter = require('./routes/homePage');
var userRouter = require('./routes/user');
var autosRouter = require('./routes/autos');

//Aquí llamo a la ruta de las api de autos
const apiAutosRouter = require('./routes/api/autosApi');
//Aquí llamo a la ruta de las api de marcas
const apiMarcasRouter = require('./routes/api/marcasApi')
//Aquí llamo a la ruta de las api de users
const apiUsersRouter = require('./routes/api/usersApi')

var app = express();

const session = require('express-session');
var cookies = require('cookie-parser');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
  secret: 'esto es un secreto',
  resave: false,
  saveUninitialized: false
}));

app.use(cookies());

app.use(userLoggedMiddleware);

app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/', homePageRouter);
app.use('/user', userRouter);
app.use('/autos', autosRouter);

//Aquí creo la colección de mis recursos de autos (APIs)
app.use('/api/autos', apiAutosRouter);
app.use('/api/marcas', apiMarcasRouter);
app.use('/api/users', apiUsersRouter);


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

console.log('---------- Servidor funcionando correctamente ----------');
console.log('---------- Funcionando en el http://localhost:5000/ ----------');

app.listen(5000);

module.exports = app;
