const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require("fs");
const path = require("path");

const uri = `mongodb+srv://reading-list:${process.env.PASSWORD}@cluster0.ptjwk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function write() {
  try {
    await client.connect();

    const keys = ["blockchain", "press", "projectPress", "shortform"];
    for (const key of keys) {
      const collection = client.db("reading-list").collection(key);
      const dataStr = fs.readFileSync(
        path.join(__dirname, `../../dynamic-website/data/${key}.json`)
      );
      const data = JSON.parse(dataStr);

      await collection.bulkWrite(
        data.map((d) => ({ insertOne: { document: d } }))
      );
    }
  } finally {
    client.close();
  }
}

write();
