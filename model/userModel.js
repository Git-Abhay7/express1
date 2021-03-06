const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
var utils = require("../commonFunction/utils");
var bcrypt = require("bcrypt");

var schema = mongoose.Schema;
var userkey = new schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userkey.plugin(mongoosePaginate);
const userModel = mongoose.model("user", userkey, "user");

(userModel["SignUp"] = async (body, res, next) => {
  try {
    var query = {
      $or: [
        {
          email: body.email,
        },
        {
          userName: body.userName,
        },
      ],
    };
    var result = await userModel.findOne(query);
    if (result) {
      if (result.email == body.email) {
        return res
          .status(utils.Error_Code.AlreadyExist, utils.Error_Message.EmailExist)
          .send(utils.Error_Message.EmailExist);
      } else if (result.userName == body.userName) {
        return res
          .status(utils.Error_Code.AlreadyExist)
          .send(utils.Error_Message.NameExist);
      }
    }
  } catch (error) {
    throw error;
  }
}),
  (userModel["logIn"] = async (body, res) => {
    try {
      var query = {
        userName: body.userName,
      };
      var fetch = await userModel.findOne(query);
      if (fetch) {
        var hash = fetch.password;
        var pass = await bcrypt.compare(body.password, hash);

        if (pass == false) {
          res
            .status(utils.Error_Code.NotMatch)
            .send(utils.Error_Message.InvalidLogin);
        }
      } else {
        res
          .status(utils.Error_Code.NotFound)
          .send(utils.Error_Message.NotExist);
      }
    } catch (error) {
      throw error;
    }
  }),
  (userModel["ListUser"] = async (params, res) => {
    try {
      var query = {};
      var options = {
        page: params.page || 1,
        limit: 10,
        sort: {
          createdAt: -1,
        },
        select: "-password -confirmPassword",
      };
      var Data = await userModel.paginate(query, options);

      if (Data.docs.length == 0) {
        res.status(utils.Error_Code.NotFound).send(utils.Error_Message.NoData);
      } else {
        return Data;
      }
    } catch (error) {
      throw error;
    }
  });

module.exports = userModel;
