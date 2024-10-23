var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');


var app = express();


app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usuario.route');
const autenticacaoRouter = require('./routes/autenticacao.route');
const produtosRouter = require('./routes/produtos.router');
app.use('/produtos',produtosRouter);
const fornecedorRouter = require('./routes/fornecedor.router');
app.use('/fornecedor',fornecedorRouter);
const tipoRouter = require('./routes/tipo.router');
app.use('/tipo',tipoRouter);

app.use('/', indexRouter);
app.use('/usuario', usersRouter);
app.use('/autenticacao', autenticacaoRouter); 


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
