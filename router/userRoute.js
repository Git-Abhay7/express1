const router = require("express").Router();
var userController = require("../controller/userController");

const { Empty, loginValidation } = require("../validator/userValidator");
const { validation } = require("../commonFunction/validate");

router.post("/signup", [Empty(), validation], userController.signUp);
router.post("/login", [loginValidation(), validation], userController.login);



module.exports = router;
