const EntrySchema = {
  title: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true, match: /^\d{4}(-\d{2}){0,2}$/ },
  work: String,
  publisher: String,
  workItalics: { type: Boolean, default: true },
  preposition: String,
  parenthetical: String,
  href: { type: String, match: /^https?/ },
  tags: [String],
  entryAdded: Date,
};

module.exports = EntrySchema;