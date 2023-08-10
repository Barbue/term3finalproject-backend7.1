const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();

const ExpressionsController = require("../controllers/ExpressionsController");

// CRUD OPERATIONS
router.get("/all", ExpressionsController.getAllExpressions);
router.post("/create-one", ExpressionsController.createOneExpression);
router.get("/get-one/:idToGet", ExpressionsController.getOneExpressionById);
router.put("/update-one/:idToUpdate", ExpressionsController.updateOneExpression
);
router.delete("/delete-one/:idToDelete",
  ExpressionsController.deleteOneExpressionById
);

module.exports = router;
