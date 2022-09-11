const mongoose = require('mongoose');
const ShortformEntry = require('./shortformEntry.model');

const BlockchainEntry = mongoose.model(
  'BlockchainEntry',
  new mongoose.Schema(ShortformEntry.obj),
  'blockchain'
);

module.exports = BlockchainEntry;
