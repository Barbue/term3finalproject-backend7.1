const favoriteVerb = require("../models/FavoriteVerbs");
var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

async function getAllFavoriteVerbs(req, res) {
  //query Verbs
  try {
    const allFavoriteVerbs = await favoriteVerb.find({});
    res.json({ success: true, favoriteverbs: allFavoriteVerbs });
  } catch (error) {
    res.json({ success: false, message: error });
  }
}

async function createOneFavoriteVerb(req, res) {
  try {
    //parse out fields from POST request
    const verb = req.body.verb
    const tense = req.body.tense;
    const je = req.body.je;
    const tu= req.body.tu;
    const il = req.body.il;
    const nous = req.body.nous;
    const vous = req.body.vous;
    const ils = req.body.ils;
    const createdBy = req.body.createdBy;
    const comments = req.body.comments;

    //pass fields to new Verb model
    //notice how it's way more organized and does the type checking for us
    const newFavoriteVerb = new favoriteVerb({
      verb: verb,
      tense: tense,
      je: je,
      tu: tu,
      il: il,
      nous: nous,
      vous: vous,
      ils: ils,
      createdBy: createdBy,
      comments: comments,
    });

    //save our new entry to the database
    const response = await newFavoriteVerb.save();

    //return the successful request to the user
    res.json({
      success: true,
      addedFavoriteVerb: response,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

async function getOneFavoriteVerbById(req, res) {
  let oneFavoriteVerbPost;
  //console.log(req.params);
  const { idToGet } = req.params;

  try {
    oneFavoriteVerbPost = await favoriteVerb.findOne({ createdById: idToGet });
    //check if the verb exists
    //throw will move to catch
    if (oneFavoriteVerbPost === null) throw "favorite verb not found";

    res.json({
      sucess: true,
      oneFavoriteVerb: oneFavoriteVerbPost,
    });
  } catch (error) {
    console.log("Error Message", error);
    res.json({ success: false, message: error });
  }
}

async function updateOneFavoriteVerb(req, res) {
  try {
    const { idToUpdate } = req.params;

    const updatedFavoriteVerb = await favoriteVerb.findOneAndUpdate(
      { createdById: idToUpdate },
      req.body
    );

    //{ id: idToUpdate }

    // const updatedVerb = Verb.updateOne({id: req.params.id}, req.body);

    res.json({ success: true, favoriteVerbUpdate: updatedFavoriteVerb });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

async function deleteOneFavoriteVerbById(req, res) {
  try {
    const { idToDelete } = req.params;
    const deletedFavoriteVerb = await favoriteVerb.findOneAndDelete({
      createdById: idToDelete,
    });
    //{id: idToDelete});

    res.json({
      success: true,
      deletedFavoriteVerb: deletedFavoriteVerb,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

module.exports = {
  createOneFavoriteVerb,
  deleteOneFavoriteVerbById,
  getAllFavoriteVerbs,
  getOneFavoriteVerbById,
  updateOneFavoriteVerb,
};