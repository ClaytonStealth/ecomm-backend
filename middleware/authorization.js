const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  console.log(req.headers);
  if (bearerToken) {
    const token = bearerToken.split(" ")[1];
    req.token = token;
    next();
  } else {
    res.status(403).json("Forbidden");
  }
  // let decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  // req.user = decoded;
  // next();
};

module.exports = {
  verifyToken,
};
