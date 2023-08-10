const Verb = require("../models/Verbs");
var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

async function getAllVerbs(req, res) {
  //query Verbs
  try {
    const allVerbs = await Verb.find({});
    res.json({ success: true, verbs: allVerbs });
  } catch (error) {
    res.json({ success: false, message: error });
  }
}

async function createOneVerb(req, res) {
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
    const newVerb = new Verb({
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
    const response = await newVerb.save();

    //return the successful request to the user
    res.json({
      success: true,
      addedVerb: response,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

async function getOneVerbById(req, res) {
  let oneVerbPost;
  //console.log(req.params);
  const { idToGet } = req.params;

  try {
    oneVerbPost = await Verb.findOne({ createdById: idToGet });
    //check if the verb exists
    //throw will move to catch
    if (oneVerbPost === null) throw "Verb not found";

    res.json({
      sucess: true,
      oneVerb: oneVerbPost,
    });
  } catch (error) {
    console.log("Error Message", error);
    res.json({ success: false, message: error });
  }
}

async function updateOneVerb(req, res) {
  try {
    const { idToUpdate } = req.params;

    const updatedVerb = await Verb.findOneAndUpdate(
      { createdById: idToUpdate },
      req.body
    );

    //{ id: idToUpdate }

    // const updatedVerb = Verb.updateOne({id: req.params.id}, req.body);

    res.json({ success: true, verbUpdate: updatedVerb });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

async function deleteOneVerbById(req, res) {
  try {
    const { idToDelete } = req.params;
    const deletedVerb = await Verb.findOneAndDelete({
      createdById: idToDelete,
    });
    //{id: idToDelete});

    res.json({
      success: true,
      deletedVerb: deletedVerb,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

module.exports = {
  createOneVerb,
  deleteOneVerbById,
  getAllVerbs,
  getOneVerbById,
  updateOneVerb,
};