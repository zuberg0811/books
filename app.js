require("dotenv").config();  // Load biến môi trường từ .env

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var BookRouter = require("./routes/book");

var app = express();

// Cấu hình body-parser (sửa lỗi khai báo)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Cấu hình MongoDB Atlas (sửa lỗi kết nối)
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/greenwich_book";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Cấu hình view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/toy", BookRouter);

// Xử lý lỗi 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Xử lý lỗi chung
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

// Cấu hình PORT (Render tự chọn PORT)
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Web server is running at http://localhost:${port}`);
});

module.exports = app;
