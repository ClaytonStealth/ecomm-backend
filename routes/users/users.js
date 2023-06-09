var express = require("express");
var router = express.Router();
var userController = require("./controller/userController");
var { verifyToken } = require("../../middleware/authorization");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/login-test", function (req, res, next) {
  res.status(200).json({
    message: "Login successful!!!!",
  });
});
router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/delete-user", verifyToken, userController.deleteUser);
router.post("/authtoken", verifyToken, userController.authtoken);

module.exports = router;
