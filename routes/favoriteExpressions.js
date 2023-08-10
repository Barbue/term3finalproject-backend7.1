const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();

const FavoriteExpressionsController = require("../controllers/FavoriteExpressionsControllers");

// CRUD OPERATIONS
router.get("/all", FavoriteExpressionsController.getAllFavoriteExpressions);
router.post("/create-one", FavoriteExpressionsController.createOneFavoriteExpression);
router.get("/get-one/:idToGet", FavoriteExpressionsController.getOneFavoriteExpressionById);
router.put("/update-one/:idToUpdate", FavoriteExpressionsController.updateOneFavoriteExpression
);
router.delete("/delete-one/:idToDelete",
FavoriteExpressionsController.deleteOneFavoriteExpressionById
);

module.exports = router;