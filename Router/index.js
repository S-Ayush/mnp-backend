const express = require("express");
const router = express();
const cookieParser = require("cookie-parser");
const Project = require("../modal/projectSchema");
const User = require("../modal/loginSchema");

router.use(cookieParser());

const authenticate = require("../middleware");
router.use(authenticate);
router.post("/", (req, res) => {
  res.json(req.body);
});

router.get("/userData", async (req, res) => {
  if (req.rootuser.role === "admin" || req.rootuser.role === "superadmin") {
    var project = await Project.find();
    var user = {
      projects: project,
      user: { ...req.rootuser._doc },
    };
    res.status(200).json(user);
  } else {
    var project = await Project.find({
      project_head_accountid: req.rootuser.id,
    });
    var user = {
      projects: project,
      user: { ...req.rootuser._doc },
    };
    res.status(200).json(user);
  }
});

//project Route ----------------------------->
router.post("/project", (req, res) => {
  const user = req.rootuser;
  const project = new Project(req.body);
  project.Project_head = user.name;
  project.project_head_accountid = user._id;
  // var updatedCompiler = [];
  // for (i = 0; i < project.compiler.length; i++) {
  //   var compiler = project.compiler[i];
  //   User.findOne({ email: compiler.email }).then((compilerPresent) => {
  //     if (compilerPresent) {
  //       updatedCompiler.push({ compilerId: compilerPresent._id });
  //     } else {
  //       let newCompiler = {
  //         name: compiler.name,
  //         email: compiler.email,
  //         password: compiler.name + 123,
  //         mobile: compiler.mobile,
  //         role: "compiler",
  //         designation: "compiler",
  //       };
  //       const addCompiler = new User(newCompiler);
  //       addCompiler
  //         .save()
  //         .then((data) => {
  //           updatedCompiler.push({ compilerId: data._id });
  //         })
  //         .catch((err) => {
  //           res.status(400).send(err);
  //         });
  //     }
  //   });
  // }

  // project.compiler = updatedCompiler;
  project
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get(`/project/:id`, (req, res) => {
  const id = req.params.id;
  console.log(id);
  Project.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.delete("/project/:id", async (req, res) => {
  const id = req.params.id;
  Project.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).json("Data Deleted!");
    })
    .catch((err) => {
      res.status(400).send("Data not Deleted");
    });
});

router.put("/project/:id", async (req, res) => {
  const id = req.params.id;
  const projectData = req.body;
  Project.findByIdAndUpdate(id, projectData)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
module.exports = router;
