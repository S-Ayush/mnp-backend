const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const BookUser = require("../modal/booksUserSchema");
const bookAuth = express();

bookAuth.use(cookieParser());
//for adding user through ui
bookAuth.post("/book/signup", async (req, res) => {
  const userExist = await BookUser.findOne({ email: req.body.email });
  if (userExist) {
    res.status(422).json({ err: "user Exist" });
  } else {
    const bookuser = new BookUser(req.body);
    bookuser
      .save()
      .then(() => {
        res.status(200).json({ Message: "successfull" });
      })
      .catch((err) => console.log(err));
  }
});

// for login users

bookAuth.post("/book/login", async (req, res) => {
  try {
    const userExist = await BookUser.findOne({ email: req.body.email });
    if (userExist) {
      const jwtToken = jwt.sign(
        { email: userExist.email },
        process.env.SECRET_JWT_KEY
      );
      res.cookie("jwtToken", jwtToken, {
        expires: new Date(Date.now() + 25920000000),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({ Message: "successfull", jwtToken });
    } else {
      res.status(422).json({ err: "User Doesn't Exist" });
    }
  } catch {
    (err) => console.log(err);
  }
});

// for log out user

// bookAuth.get("/logout", (req, res) => {
//   res.clearCookie("jwtToken", {
//     httpOnly: true,
//     sameSite: "none",
//     secure: true,
//   });
//   res.status(200).send("user Logout");
// });

module.exports = bookAuth;
