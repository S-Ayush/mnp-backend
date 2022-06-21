const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: true,
  },
  project_theme: {
    type: String,
    required: true,
  },
  project_genre: {
    type: String,
    required: true,
  },
  project_language: {
    type: String,
    required: true,
  },
  project_type: {
    type: String,
    required: true,
  },
  package: {
    type: String,
    required: true,
  },
  compiler: {
    type: Array,
    required: true,
  },
  Project_head: {
    type: String,
  },
  total_slots: {
    type: Number,
    required: true,
  },
  filled_slots: {
    type: Number,
    required: true,
  },
  submitted: {
    type: Number,
    required: true,
  },
  paid: {
    type: Number,
    required: true,
  },
  project_head_accountid: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Project = mongoose.model("PROJECT", projectSchema);

module.exports = Project;
