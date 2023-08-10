const favoriteWord = require("../models/FavoriteWords");
var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

async function getAllFavoriteWords(req, res) {
  //query Words
  try {
    const allFavoriteWords = await favoriteWord.find({});
    res.json({ success: true, favoritewords: allFavoriteWords });
  } catch (error) {
    res.json({ success: false, message: error });
  }
}

async function createOneFavoriteWord(req, res) {
  try {
    //parse out fields from POST request
    const word = req.body.word;
    const partOfSpeech = req.body.partOfSpeech;
    const translation = req.body.translation;
    const exampleSentence = req.body.exampleSentence;
    const createdBy = req.body.createdBy;
    const comments = req.body.comments;

    //pass fields to new Word model
    //notice how it's way more organized and does the type checking for us
    const newFavoriteWord = new favoriteWord({
      word: word,
      partOfSpeech: partOfSpeech,
      translation: translation,
      exampleSentence: exampleSentence,
      createdBy: createdBy,
      comments: comments,
    });

    //save our new entry to the database
    const response = await newFavoriteWord.save();

    //return the successful request to the user
    res.json({
      success: true,
      addedWord: response,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

async function getOneFavoriteWordById(req, res) {
  let oneFavoriteWordPost;
  //console.log(req.params);
  const { idToGet } = req.params;

  try {
    oneFavoriteWordPost = await favoriteWord.findOne({ createdById: idToGet });
    //check if the word exists
    //throw will move to catch
    if (oneFavoriteWordPost === null) throw "Favorite word not found";

    res.json({
      sucess: true,
      oneFavoriteWord: oneFavoriteWordPost,
    });
  } catch (error) {
    console.log("Error Message", error);
    res.json({ success: false, message: error });
  }
}

async function updateOneFavoriteWord(req, res) {
  try {
    const { idToUpdate } = req.params;

    const updatedFavoriteWord = await favoriteWord.findOneAndUpdate(
      { createdById: idToUpdate },
      req.body
    );

    //{ id: idToUpdate }

    // const updatedWord = Word.updateOne({id: req.params.id}, req.body);

    res.json({ success: true, updatedFavoriteWord: updatedFavoriteWord });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

async function deleteOneFavoriteWordById(req, res) {
  try {
    const { idToDelete } = req.params;
    const deletedFavoriteWord = await favoriteWord.findOneAndDelete({
      createdById: idToDelete,
    });
    //{id: idToDelete});

    res.json({
      success: true,
      deletedFavoriteWord: deletedFavoriteWord,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

module.exports = {
  createOneFavoriteWord,
  deleteOneFavoriteWordById,
  getAllFavoriteWords,
  getOneFavoriteWordById,
  updateOneFavoriteWord,
};
