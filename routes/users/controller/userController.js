const User = require("../model/User");
const { errorHandler } = require("./userHelper");

module.exports = {
  login: async (req, res) => {
    try {
      let newUser = await new User({
        username: req.body.username,
        password: req.body.password,
      });
      // console.log(newUser);
      let savedUser = await newUser.save();
      res.status(200).json({
        message: "POST request from controller",
        userObj: savedUser,
      });
    } catch (e) {
      console.log(e);
      res.status(409).json({
        message: e,
      });
    }
  },
  register: async (req, res) => {
    try {
      let foundUser = await User.findOne({ username: req.body.username });
      if (foundUser) {
        throw {
          status: 409,
          message: "Username already exists",
        }
      }
      let newUser = await new User({
        username: req.body.username,
        password: req.body.password,
      });
      // console.log(newUser);
      let savedUser = await newUser.save();
      res.status(200).json({
        message: "POST request from controller",
        userObj: savedUser,
      });
    } catch (e) {
      let errorMessage = await errorHandler(e);
      res.status(errorMessage.status).json({
        message: errorMessage.message,
      });
    }
  },
};
