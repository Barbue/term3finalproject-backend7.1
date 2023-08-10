//import mongoose library
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

//create a wordSchema
const favoriteWordSchema = new mongoose.Schema({
  word: String,
  partOfSpeech: String,
  translation: String,
  exampleSentence: String,
  createdBy: String,
  comments: String,
  createdById: { type: String, default: uuidv4 },
  createdAt: { type: Date, default: Date.now },
  lastModified: Date,
  lastUpdatedById: String,
});

// { type: Date, default: Date.now},

//register model to collection
const favoriteWord = mongoose.model("favoritewords",favoriteWordSchema);

//make our model accessible to outside files
module.exports = favoriteWord;