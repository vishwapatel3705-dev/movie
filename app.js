const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(cookieParser());

app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.locals.userId = req.cookies.userId;
  res.locals.pageTitle = "";
  next();
});

app.use("/", movieRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
