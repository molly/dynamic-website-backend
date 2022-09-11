const mongoose = require('mongoose');
const EntrySchema = require('./entry.model');

const ShortformEntry = mongoose.model(
  'ShortformEntry',
  new mongoose.Schema({
    ...EntrySchema,
    started: { type: String, required: true, match: /^\d{4}(-\d{2}){0,2}$/ },
    completed: { type: String, required: false, match: /^\d{4}(-\d{2}){0,2}$/ },
    status: {
      type: String,
      enum: ['read', 'currentlyReading', 'reference', 'shelved', 'toRead'],
    },
    relatedReading: [String],
  }),
  'shortform'
);

module.exports = ShortformEntry;
