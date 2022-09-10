const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.User;

const verifyJwt = (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    return res.status(403).send({ message: "Token missing from request" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyJwt };