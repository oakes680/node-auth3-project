const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secrets");

module.exports = function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Token is not valid!" });
      } else {
        req.user = decodedToken
        console.log('from restricted', req.user)
        next();
      }
    });
  } else {
    res.status(401).json({ message: "bro where is your token?" });
  }
};
