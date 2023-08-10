const favoriteExpression = require("../models/FavoriteExpressions");
var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

async function getAllFavoriteExpressions(req, res) {
  //query Expressions
  try {
    const allFavoriteExpressions = await favoriteExpression.find({});
    res.json({ success: true, favoriteexpressions: allFavoriteExpressions });
  } catch (error) {
    res.json({ success: false, message: error });
  }
}

async function createOneFavoriteExpression(req, res) {
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
    const newFavoriteExpression = new favoriteExpression({
      theme: theme,
      expression: expression,
      literaltranslation: literaltranslation,
      metaphoricaltranslation: metaphoricaltranslation,
      createdBy: createdBy,
      context: context,
    });

    //save our new entry to the database
    const response = await newFavoriteExpression.save();

    //return the successful request to the user
    res.json({
      success: true,
      addedFavoriteExpression: response,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

async function getOneFavoriteExpressionById(req, res) {
  let oneFavoriteExpressionPost;
  //console.log(req.params);
  const { idToGet } = req.params;

  try {
    oneFavoriteExpressionPost = await favoriteExpression.findOne({ createdById: idToGet });
    //check if the word exists
    //throw will move to catch
    if (oneFavoriteExpressionPost === null) throw "Favorite expression not found";

    res.json({
      sucess: true,
      oneFavoriteExpression: oneFavoriteExpressionPost,
    });
  } catch (error) {
    console.log("Error Message", error);
    res.json({ success: false, message: error });
  }
}

async function updateOneFavoriteExpression(req, res) {
  try {
    const { idToUpdate } = req.params;

    const updatedFavoriteExpression = await favoriteExpression.findOneAndUpdate(
      { createdById: idToUpdate },
      req.body
    );

    //{ id: idToUpdate }

    // const updatedExpression = Expression.updateOne({id: req.params.id}, req.body);

    res.json({ success: true, favoriteExpressionUpdate: updatedFavoriteExpression });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

async function deleteOneFavoriteExpressionById(req, res) {
  try {
    const { idToDelete } = req.params;
    const deletedFavoriteExpression = await favoriteExpression.findOneAndDelete({
      createdById: idToDelete,
    });
    //{id: idToDelete});

    res.json({
      success: true,
      deletedFavoriteExpression: deletedFavoriteExpression,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

module.exports = {
  createOneFavoriteExpression,
  deleteOneFavoriteExpressionById,
  getAllFavoriteExpressions,
  getOneFavoriteExpressionById,
  updateOneFavoriteExpression,
};