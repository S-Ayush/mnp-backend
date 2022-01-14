const dotenv = require("dotenv");
const express = require("express");
var cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
//allow cors origin
app.use(
  cors({
    credentials: true,
    origin: "maninanest.com", //"http://127.0.0.1:5500",
  })
);

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 3000;

//for getting json body from client
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// just for testing purpose
app.post("/", (req, res) => {
  res.json(req.body);
});

require("./DB/connection");

//routin starts from here
app.use(require("./authentication"));
app.use(require("./Router"));

//listening on specific port
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
