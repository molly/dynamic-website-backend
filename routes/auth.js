const express = require("express");
const db = require("../models");
const User = db.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/signup", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user.save((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    return res.send({ message: "Registration successful" });
  });
});

router.post("/signin", function (req, res) {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const isValidPassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 604800, // 1 week
    });

    req.session.token = token;
    res.status(200).send({ id: user._id, username: user.username });
  });
});

router.post("/signout", function (req, res, next) {
  try {
    req.session = null;
    return res.status(200).send({ message: "Signed out" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
