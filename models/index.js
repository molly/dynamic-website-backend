const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.User = require("./user.model");

module.exports = db;
