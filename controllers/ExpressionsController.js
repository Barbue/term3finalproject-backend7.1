const Expression = require("../models/Expressions");
var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

async function getAllExpressions(req, res) {
  //query Expressions
  try {
    const allExpressions = await Expression.find({});
    res.json({ success: true, expressions: allExpressions });
  } catch (error) {
    res.json({ success: false, message: error });
  }
}

async function createOneExpression(req, res) {
  try {
    //parse out fields from POST request
    const theme = req.body.theme;
    const expression = req.body.expression;
    const literaltranslation = req.body.literaltranslation;
    const metaphoricaltranslation = req.body.metaphoricaltranslation;
    const createdBy = req.body.createdBy;
    const context = req.body.context;


  

    //pass fields to new Expression model
    //notice how it's way more organized and does the type checking for us
    const newExpression = new Expression({
      theme: theme,
      expression: expression,
      literaltranslation: literaltranslation,
      metaphoricaltranslation: metaphoricaltranslation,
      createdBy: createdBy,
      context: context,
    });

    //save our new entry to the database
    const response = await newExpression.save();

    //return the successful request to the user
    res.json({
      success: true,
      addedExpression: response,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

async function getOneExpressionById(req, res) {
  let oneExpressionPost;
  //console.log(req.params);
  const { idToGet } = req.params;

  try {
    oneExpressionPost = await Expression.findOne({ createdById: idToGet });
    //check if the word exists
    //throw will move to catch
    if (oneExpressionPost === null) throw "Expression not found";

    res.json({
      sucess: true,
      oneExpression: oneExpressionPost,
    });
  } catch (error) {
    console.log("Error Message", error);
    res.json({ success: false, message: error });
  }
}

async function updateOneExpression(req, res) {
  try {
    const { idToUpdate } = req.params;

    const updatedExpression = await Expression.findOneAndUpdate(
      { createdById: idToUpdate },
      req.body
    );

    //{ id: idToUpdate }

    // const updatedExpression = Expression.updateOne({id: req.params.id}, req.body);

    res.json({ success: true, expressionUpdate: updatedExpression });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

async function deleteOneExpressionById(req, res) {
  try {
    const { idToDelete } = req.params;
    const deletedExpression = await Expression.findOneAndDelete({
      createdById: idToDelete,
    });
    //{id: idToDelete});

    res.json({
      success: true,
      deletedExpression: deletedExpression,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

module.exports = {
  createOneExpression,
  deleteOneExpressionById,
  getAllExpressions,
  getOneExpressionById,
  updateOneExpression,
};