const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();

const WordsController = require("../controllers/WordsControllers");

// CRUD OPERATIONS
router.get("/all", WordsController.getAllWords);
router.post("/create-one", WordsController.createOneWord);
router.get("/get-one/:idToGet", WordsController.getOneWordById);
router.put("/update-one/:idToUpdate", WordsController.updateOneWord);
router.delete("/delete-one/:idToDelete", WordsController.deleteOneWordById);
//router.put("/update-one/:idToUpdate", WordsController.updateOneWord);



module.exports = router;
