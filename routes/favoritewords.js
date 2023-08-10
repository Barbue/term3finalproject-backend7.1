const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();

const favoriteWordsController = require("../controllers/favoriteWordControllers");

// CRUD OPERATIONS
router.get("/all", favoriteWordsController.getAllFavoriteWords);
router.post("/create-one", favoriteWordsController.createOneFavoriteWord);
router.get("/get-one/:idToGet", favoriteWordsController.getOneFavoriteWordById);
router.put("/update-one/:idToUpdate",favoriteWordsController.updateOneFavoriteWord);
router.delete("/delete-one/:idToDelete", favoriteWordsController.deleteOneFavoriteWordById);
//router.put("/update-one/:idToUpdate", WordsController.updateOneWord);



module.exports = router;
