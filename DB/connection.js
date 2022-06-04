const mongoose = require("mongoose");

const DB = process.env.DATABASE; //"mongodb://localhost:27017/mnp";

mongoose
  .connect(DB)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.log(err));
