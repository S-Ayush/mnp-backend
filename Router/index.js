const express = require("express");
const router = express();
const cookieParser = require("cookie-parser");

router.use(cookieParser());

const authenticate = require("../middleware");
router.use(authenticate);
router.get("/", (req, res) => {
  res.json(req.body);
});

router.get("/userData", (req, res) => {
  res.json(req.rootuser);
});

module.exports = router;
