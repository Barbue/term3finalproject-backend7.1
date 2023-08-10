var express = require("express");
var router = express.Router();

// const Word = require('../models/words');

/* GET home page. */
router.get("/", async function (req, res) {
  //query all words
  try {
    const allWords = await db().collection("words").find({});
    res.json({ words: allWords });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
