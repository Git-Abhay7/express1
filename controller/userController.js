var user = require("../model/userModel");
const bcrypt = require("bcrypt");
var utils = require("../commonFunction/utils");

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
          .status(
            utils.Success_Code.Success,
            utils.Success_Message.SignUp_Successfully
          )
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
};
