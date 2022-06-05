const dotenv = require("dotenv");
const express = require("express");
const paths = require("path");
var cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const { path } = require("./authentication");
//allow cors origin
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://maninanest.com",
      "http://mnp-backend.herokuapp.com",
    ], //"http://maninanest.com", //"http://127.0.0.1:5500",
  })
);

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 3000;

//for getting json body from client
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// just for testing purpose

const staticPath = paths.join(__dirname, "public");
app.use(express.static(staticPath));
console.log(paths.join(__dirname, "public"));
app.get("/", (req, res) => {
  res.json(req.body);
});

require("./DB/connection");

//routin starts from here
app.use(require("./authentication"));
app.use(require("./authentication/bookUserAuthentication.js"));
app.use(require("./Router/BookRouter"));
app.use(require("./Router"));

//listening on specific port
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
