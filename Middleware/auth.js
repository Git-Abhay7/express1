var jwt = require("jsonwebtoken");
var user = require("../model/userModel");
var utils = require("../commonFunction/utils");

module.exports = {
  TokenVerify: async (req, res, next) => {
    try {
      if (!req.headers.token) {
        res
          .status(utils.Error_Code.NotFound)
          .send(utils.Error_Message.Not_Found);
      } else {
        data = await jwt.verify(req.headers.token, "express");
        var User = await user.findOne({ userName: data.userName });
        if (!User) {
          res
            .status(utils.Error_Code.NotFound)
            .send(utils.Error_Message.NotExist);
        } else {
         req.User= User.email;
          next();
        }
      }
    } catch (error) {
      throw error;
    }
  },
};
