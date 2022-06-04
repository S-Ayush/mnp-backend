const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const BookUser = require("../modal/booksUserSchema");
// const User = require("../modal/loginSchema");

const booksAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;
    const verifyToken = jwt.verify(token, process.env.SECRET_JWT_KEY);

    const pipeline = [
      { $match: { email: verifyToken.email } },
      {
        $lookup: {
          from: "books",
          localField: "books",
          foreignField: "_id",
          as: "booksDetails",
        },
      },
    ];

    const rootUser = await BookUser.aggregate(pipeline);
    console.log("rootUser", rootUser);
    if (!rootUser) {
      throw new Error("user not found");
    } else {
      req.rootuser = rootUser;
      next();
    }
  } catch (err) {
    res.status(401).json({ err: "unauthorised" });
    console.log(err);
  }
};

module.exports = booksAuthenticate;
