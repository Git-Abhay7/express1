var { check } = require("express-validator");

module.exports = {
  Empty: () => {
    return [
      check("firstName").notEmpty().withMessage("Please fill firstName  field"),
      check("userName").notEmpty().withMessage("Please fill userName  field"),
      check("email")
        .notEmpty()
        .withMessage("Please fill Email field.")
        .isEmail(),
      check("password")
        .notEmpty()
        .withMessage("Please fill password field .")
        .isLength({ min: 5 })
        .withMessage("password length should be more than 5."),
      check("confirmPassword")
        .notEmpty()
        .withMessage("Please fill confirm password field ."),
    ];
  },
  loginValidation:()=>{
    return [
      check("userName").notEmpty().withMessage("Please enter userName."),
      check("password").notEmpty().withMessage("please enter password."),
    ]
  }
};
