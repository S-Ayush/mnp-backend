const express = require("express");
const publicRoute = express();
const cookieParser = require("cookie-parser");
const Project = require("../../modal/projectSchema");

publicRoute.use(cookieParser());

publicRoute.post("/addpublicproject", (req, res) => {
  const project = new Project(req.body);
  project
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(err);
      console.log(err);
    });
});

module.exports = publicRoute;
