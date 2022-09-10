const { MongoClient, ServerApiVersion } = require("mongodb");
const { client } = require("../db/connect");

const uri = `mongodb+srv://reading-list:${process.env.PASSWORD}@cluster0.ptjwk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const getTags = async () => {
  await client.connect();
  const tags = {};
  for (const genre of ["shortform", "blockchain", "press"]) {
    const collection = client.db("reading-list").collection(`${genre}Tags`);
    const cursor = await collection
      .find({})
      .collation({ locale: "en" })
      .sort({ text: 1 });
    tags[genre] = [];
    await cursor.forEach(({ text, value }) => {
      tags[genre].push({ text, value });
    });
  }
  return tags;
};

module.exports = { getTags };
