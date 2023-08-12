const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");

//load environment variables from .env (.env is the default file)
require("dotenv").config();

//look in our .env file for PORT, if it's not there, default to 5002.
const PORT = process.env.PORT || 5002;

const mongooseConnect = require("./mongoose.js");
mongooseConnect();

//register routes.
//NOTE: notice how there is .js after index, this is because
// we exported the module as index.
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var wordsRouter = require("./routes/words");
var expressionsRouter = require("./routes/expressions");
var verbsRouter = require("./routes/verbs");
var favoriteWordsRouter = require("./routes/favoritewords");
var favoriteExpressionsRouter = require("./routes/favoriteExpressions");
var favoriteVerbsRouter = require("./routes/favoriteVerbs");

var app = express();

//add CORS middleware
// stops cors error from frontend api calls

app.use(cors(
  {
  origin: process.env.CORS_ORIGIN
  } ))
// app.use(cors());
app.options("*", cors());

//multer
// app.use(multer());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//set up logger and cookie parser
app.use(logger("dev"));

//parse the data coming
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//allows use to load static files from public
app.use(express.static(path.join(__dirname, "public")));

//register routes
app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/words", wordsRouter);
app.use("/api/expressions", expressionsRouter);
app.use("/api/verbs", verbsRouter);
app.use("/api/favoritewords", favoriteWordsRouter);
app.use("/api/favoriteexpressions", favoriteExpressionsRouter);
app.use("/api/favoriteverbs", favoriteVerbsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//only do this if you don't have a /bin directory
// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });

module.exports = app;
