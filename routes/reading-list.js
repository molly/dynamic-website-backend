const {
  BlockchainTag,
  PressTag,
  ShortformTag,
} = require('../models/tag.model');
const sortBy = require('lodash.sortby');

const express = require('express');
const router = express.Router();

const getCollectionTags = async (model) => {
  const tags = await model.find({}, '-_id');
  return sortBy(tags, (t) => t.text.toLowerCase());
};

router.get('/tags', async (_, res) => {
  // TODO: Cache this
  const tags = {
    blockchain: await getCollectionTags(BlockchainTag),
    press: await getCollectionTags(PressTag),
    shortform: await getCollectionTags(ShortformTag),
  };
  res.send(tags);
});

module.exports = router;
