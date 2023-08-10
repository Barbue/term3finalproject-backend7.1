//import mongoose library
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

//create a wordSchema
const verbSchema = new mongoose.Schema({
  verb: String,
  tense: String,
  je: String,
  tu: String,
  il: String,
  nous: String,
  vous: String,
  ils: String,
  createdBy: String,
  comments: String,
  createdById: { type: String, default: uuidv4 },
  createdAt: { type: Date, default: Date.now },
  lastModified: Date,
  lastUpdatedById: String,
});

// { type: Date, default: Date.now},

//register model to collection
const Verb = mongoose.model("verbs", verbSchema);

//make our model accessible to outside files
module.exports = Verb;