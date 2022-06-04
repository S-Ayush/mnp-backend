const express = require("express");
const bookRouter = express();
const cookieParser = require("cookie-parser");
const fs = require("fs");
const multer = require("multer");
const BOOK = require("../../modal/bookSchema");

const Storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

bookRouter.use(cookieParser());

bookRouter.get(`/book`, (req, res) => {
  BOOK.find()
    .sort({ ts: -1 })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

const booksAuthenticate = require("../../middleware/booksMiddleware");

bookRouter.get("/user/book", booksAuthenticate, (req, res) => {
  res.status(200).json(req.rootuser);
});

bookRouter.post("/book", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log("err", err);
    } else {
      const { title, authors, drive_url, isbn } = req.body;
      const cover_url = `/uploads/${req.file.filename}`;
      const book = new BOOK({
        title,
        authors,
        drive_url,
        isbn,
        cover_url,
        ts: new Date(),
      });
      book
        .save()
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  });
});

module.exports = bookRouter;
