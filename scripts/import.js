const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const uri = `mongodb+srv://reading-list:${process.env.PASSWORD}@cluster0.ptjwk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const SAME_MONTH_REGEX = new RegExp(/([A-Za-z]+ \d{1,2})[-–]\d{1,2}(, \d{4})/);
const DIFFERENT_MONTHS_REGEX = new RegExp(
  /([A-Za-z]+ \d{1,2})[-–][A-Za-z]+ \d{1,2}(, \d{4})/
);
function getMomentFromWeek(week) {
  const sameMatch = week.match(SAME_MONTH_REGEX);
  if (sameMatch) {
    return moment(sameMatch[1] + sameMatch[2], "MMMM D, YYYY");
  }
  const differentMatch = week.match(DIFFERENT_MONTHS_REGEX);
  if (differentMatch) {
    return moment(differentMatch[1] + differentMatch[2], "MMMM D, YYYY");
  }
  return moment("1970-01-01", MOMENT_FORMATS);
}

async function write(collectionName) {
  try {
    await client.connect();
    const collection = client.db("reading-list").collection(collectionName);
    const rawData = fs.readFileSync(
      path.join(__dirname, `../../dynamic-website/data/${collectionName}.json`)
    );
    const data = JSON.parse(rawData);
    for (const ind in data) {
      if ("week" in data[ind]) {
        const m = getMomentFromWeek(data[ind].week);
        data[ind].started = m.format("YYYY-MM-DD");
        delete data[ind].week;
      }
    }

    await collection.insertMany(data);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}
