var user = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var utils = require("../commonFunction/utils");
var middleware = require("../Middleware/auth");

module.exports = {
  signUp: async (req, res) => {
    await user.SignUp(req.body, res);
    try {
      if (req.body.password != req.body.confirmPassword) {
        res
          .status(utils.Error_Code.NotMatch)
          .send(utils.Error_Message.NotMatch);
      } else {
        const saltrounds = 10,
          hash = await bcrypt.hash(req.body.password, saltrounds);
        req.body.password = hash;
        await new user(req.body).save();
        res
          .status(utils.Success_Code.Success)
          .send(utils.Success_Message.SignUp_Successfully);
      }
    } catch (error) {
      res
        .status(
          utils.Error_Code.Internal_Error,
          utils.Error_Message.InternalError
        )
        .send(utils.Error_Message.InternalError);
    }
  },
  login: async (req, res) => {
    await user.logIn(req.body, res);
    try {
      const token = await jwt.sign(
        {
          userName: req.body.userName,
        },
        "express",
        {
          expiresIn: 60 * 60,
        }
      );

      res.status(utils.Success_Code.Success, utils.Success_Message.Login).send({
        Token: token,
      });
    } catch (error) {
      res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },
  getUser: async (req, res) => {
    try {
      var Found = await user.findOne({
        email: req.User,
      });
      res.status(utils.Success_Code.Success).send(Found);
    } catch (error) {
      throw error;
    }
  },
};
