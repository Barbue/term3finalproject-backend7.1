const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();

const favoriteVerbsController = require("../controllers/FavoriteVerbsControllers");

// CRUD OPERATIONS
router.get("/all", favoriteVerbsController.getAllFavoriteVerbs);
router.post("/create-one", favoriteVerbsController.createOneFavoriteVerb);
router.get("/get-one/:idToGet", favoriteVerbsController.getOneFavoriteVerbById);
router.put("/update-one/:idToUpdate", favoriteVerbsController.updateOneFavoriteVerb);
router.delete("/delete-one/:idToDelete", favoriteVerbsController.deleteOneFavoriteVerbById);

module.exports = router;