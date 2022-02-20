var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var d = require('./data.js')


const port = 80;

console.log('hi')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//const { domainToUnicode } = require('url');

var app = express();

app.use(express.static('public'))
app.use(express.static('client'))

app.get('/client', function(req, res) {
  res.sendFile(path.join(__dirname, 'client', '/index.html'));
});

app.get('/json', (req, res) => {
  console.log(d)

  //var u = db.get("users")
  //console.log(u)

  //db.push("/test1","super test");

  //db.set('key', 'value');

  //console.log(db)
  //var k = db.get('key');
  //console.log(k)

  console.log(req.query)
  console.log(req.query.a)
  res.json(d);
})

app.post('/form', function(req, res) {
  console.log(req.body)
  console.log('form post')
  res.json({ a: 100 });
});

app.get('/posts/:id', async (req, res) => {
  await db.read()
db.data ||= { posts: [] }
const { posts } = db.data
  const post = posts.find((p) => p.id === req.params.id)
  res.send(post)
})

app.post('/posts', async (req, res, next) => {
  const post = posts.push(req.body)
  await db.write()
  res.send(post)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
