const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();

const VerbsController = require("../controllers/VerbsControllers");

// CRUD OPERATIONS
router.get("/all", VerbsController.getAllVerbs);
router.post("/create-one", VerbsController.createOneVerb);
router.get("/get-one/:idToGet", VerbsController.getOneVerbById);
router.put("/update-one/:idToUpdate", VerbsController.updateOneVerb);
router.delete("/delete-one/:idToDelete", VerbsController.deleteOneVerbById);

module.exports = router;
