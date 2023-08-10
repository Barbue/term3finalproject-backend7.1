const Word = require("../models/Words");
var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

async function getAllWords(req, res) {
  //query Words
  try {
    const allWords = await Word.find({});
    res.json({ success: true, words: allWords });
  } catch (error) {
    res.json({ success: false, message: error });
  }
}

async function createOneWord(req, res) {
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
    const newWord = new Word({
      word: word,
      partOfSpeech: partOfSpeech,
      translation: translation,
      exampleSentence: exampleSentence,
      createdBy: createdBy,
      comments: comments,
    });

    //save our new entry to the database
    const response = await newWord.save();

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

async function getOneWordById(req, res) {
  let oneWordPost;
  //console.log(req.params);
  const { idToGet } = req.params;

  try {
    oneWordPost = await Word.findOne({ createdById: idToGet });
    //check if the word exists
    //throw will move to catch
    if (oneWordPost === null) throw "Word not found";

    res.json({
      sucess: true,
      oneWord: oneWordPost,
    });
  } catch (error) {
    console.log("Error Message", error);
    res.json({ success: false, message: error });
  }
}

async function updateOneWord(req, res) {
  try {
    const { idToUpdate } = req.params;

    const updatedWord = await Word.findOneAndUpdate(
      { createdById: idToUpdate },
      req.body
    );

    //{ id: idToUpdate }

    // const updatedWord = Word.updateOne({id: req.params.id}, req.body);

    res.json({ success: true, wordUpdate: updatedWord });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

async function deleteOneWordById(req, res) {
  try {
    const { idToDelete } = req.params;
    const deletedWord = await Word.findOneAndDelete({
      createdById: idToDelete,
    });
    //{id: idToDelete});

    res.json({
      success: true,
      deletedWord: deletedWord,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

module.exports = {
  createOneWord,
  deleteOneWordById,
  getAllWords,
  getOneWordById,
  updateOneWord,
};
