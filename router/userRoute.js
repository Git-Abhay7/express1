const router = require("express").Router();
var userController = require("../controller/userController");
var middleware = require("../Middleware/auth");

const { Empty, loginValidation } = require("../validator/userValidator");
const { validation } = require("../commonFunction/validate");

router.post("/signup", [Empty(), validation], userController.signUp);
router.post("/login", [loginValidation(), validation], userController.login);
router.get("/getProfile", middleware.TokenVerify, userController.getUser);

module.exports = router;
