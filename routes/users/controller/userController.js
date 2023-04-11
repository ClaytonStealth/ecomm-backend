const User = require("../model/User");
const {
  createUser,
  hashPassword,
  errorHandler,
  comparePassword,
} = require("./userHelper");

module.exports = {
  login: async (req, res) => {
    try {
      //foundUser is the User object from the DB
      let foundUser = await User.findOne({ username: req.body.username });
      //if not found with return undefined which evaluates as false
      if (!foundUser) {
        throw {
          status: 404,
          message: "Username does not exists!",
        };
      }
      // throw error if password from the fornt end doesnt match the DB
      let comparedPassword = await comparePassword(
        req.body.password,
        foundUser.password
      );
      if (!comparedPassword) {
        throw {
          status: 401,
          message: "Password is incorrect",
        };
      }
      // console.log(newUser);
      res.status(200).json({
        message: "POST request from controller",
        userObj: foundUser,
      });
    } catch (e) {
      let errorMessage = await errorHandler(e);
      res.status(errorMessage.status).json({ message: errorMessage.message });
    }
  },
  register: async (req, res) => {
    try {
      let foundUser = await User.findOne({ username: req.body.username });
      if (foundUser) {
        throw {
          status: 409,
          message: "Username already exists",
        };
      }
      let newUser = await createUser(req.body);
      //password hash
      let hashedPassword = await hashPassword(newUser.password);
      newUser.password = hashedPassword;
      // console.log(newUser);
      let savedUser = await newUser.save();
      res.status(200).json({
        message: "Registered",
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
