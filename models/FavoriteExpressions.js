//import mongoose library
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

//create a expressionSchema
const favoriteExpressionSchema = new mongoose.Schema({
  theme: String,
  expression: String,
  literaltranslation: String,
  metaphoricaltranslation: String,
  createdBy: String,
  context: String,
  createdById: { type: String, default: uuidv4 },
  createdAt: { type: Date, default: Date.now },
  lastModified: Date,
  lastUpdatedById: String,
});

// { type: Date, default: Date.now},

//register model to collection
const favoriteExpression = mongoose.model("favoriteexpressions", favoriteExpressionSchema);

//make our model accessible to outside files
module.exports = favoriteExpression;
