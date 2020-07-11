const router = require("express").Router();
var userController = require("../controller/userController");

const { Empty } = require("../validator/userValidator");
const { validation } = require("../commonFunction/validate");

router.post("/signup", [Empty(), validation], userController.signUp);

module.exports = router;
