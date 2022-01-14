const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = express();
const User = require("../modal/loginSchema");

auth.use(cookieParser());
//for adding user through ui
auth.post("/signup", async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    res.status(422).json({ err: "user Exist" });
  } else {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const user = new User(req.body);
    user
      .save()
      .then(() => {
        res.status(200).json({ Message: "successfull" });
      })
      .catch((err) => console.log(err));
  }
});

// for login users

auth.post("/login", async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      const isMatch = await bcrypt.compare(
        req.body.password,
        userExist.password
      );
      if (!isMatch) {
        res.status(422).json({ err: "invalid credentials" });
      } else {
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
      }
    } else {
      res.status(422).json({ err: "invalid credentials" });
    }
  } catch {
    (err) => console.log(err);
  }
});

module.exports = auth;
