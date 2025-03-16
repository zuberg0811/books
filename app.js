var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//1. declare and config "body-parser" => form input
var bodyParser = require('body-parser')
bodyParser.urlencoded({ extended: false })

//2. declare and config "mongoose" => data access
var mongoose = require('mongoose')
//note: "greenwich_book" is database name
const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://rabb1t:frQsJsh7KUvGHO29@toystoredb.jcpoj.mongodb.net/?retryWrites=true&w=majority&appName=ToyStoreDB";
const uri = "mongodb+srv://rabb1t:frQsJsh7KUvGHO29@toystoredb.jcpoj.mongodb.net/?retryWrites=true&w=majority&appName=ToysDB";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
console.log(client)
mongoose.connect('mongodb+srv://rabb1t:frQsJsh7KUvGHO29@toystoredb.jcpoj.mongodb.net/ToysDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB!');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// run().catch(console.dir);
// var db= "mongodb://localhost:27017/greenwich_book"
// mongoose.connect(db)
//   .then(() => console.log('db connect success'))
//   .catch((err) => console.error('db connect error') + err)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//3. declare & config BookRouter
var BookRouter = require('./routes/book');
app.use('/toy', BookRouter)

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

//config custom port (default port: 3000)
var port = process.env.PORT || 80
var host = '127.0.0.1';
app.listen(port, host, () => {
  console.log(`Web server is running at ${host} ` + port)
})

module.exports = app;
