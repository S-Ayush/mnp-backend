const mongoose = require("mongoose");

const DB = "mongodb://localhost:27017/mnp"; ///process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.log(err));
