require("dotenv").config();

const express = require("express");
const path = require("node:path");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const app = express();
const { Pool } = require("pg");
const passport = require("./config/passport");

const indexRouter = require("./routes/indexRouter");
const loginRouter = require("./routes/loginRouter");
const signUpRouter = require("./routes/signUpRouter");
const membershipRouter = require("./routes/membershipRouter");
const messageRouter = require("./routes/messageRouter");
const adminRouter = require("./routes/adminRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

app.use(
  expressSession({
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 }, //Remove cookies after 2 weeks
  }),
);
app.use(passport.initialize());
app.use(passport.session());

//Allows user property in ejs files
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/sign-up", signUpRouter);
app.use("/membership", membershipRouter);
app.use("/message", messageRouter);
app.use("/admin", adminRouter);

//404 Not found error handler
app.use((req, res, next) => {
  res
    .status(404)
    .render("error", { message: "Page Not Found", statusCode: 404 });
});

app.use((err, req, res, next) => {
  console.error(err);

  res
    .status(err.statusCode || 500)
    .render("error", {
      message: err.message || "Something went wrong",
      statusCode: err.statusCode || 500,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on Port: ${PORT}`);
});
