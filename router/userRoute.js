const router = require("express").Router();
var userController = require("../controller/userController");
var middleware = require("../Middleware/auth");

const { Empty, loginValidation } = require("../validator/userValidator");
const { validation } = require("../commonFunction/validate");

router.post("/signup", [Empty(), validation], userController.signUp);
router.post("/login", [loginValidation(), validation], userController.login);
router.get("/getProfile", middleware.TokenVerify, userController.getUser);
router.put("/deleteUser", middleware.TokenVerify, userController.deleteUser);
router.get("/list/:page", userController.listUser);

module.exports = router;
