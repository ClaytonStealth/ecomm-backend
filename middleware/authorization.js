const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    // console.log(req.headers);
    if (bearerToken) {
      const token = bearerToken.split(" ")[1];
      //   req.token = token;
      let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      //if expired time is less than current time throw error if true.
      if (decoded.exp < Date.now() / 1000) {
        throw {
          status: 403,
          message: "Token Expired",
        };
      }
      req.decoded = decoded;

      next();
    } else {
      throw {
        status: 403,
        message: "Forbidden",
      };
    }
  } catch (e) {
    // let errorMessage = await errorHandler(e);
    res.status(403).json("invalid token");
  }
  // req.user = decoded;
  // next();
};

module.exports = {
  verifyToken,
};
