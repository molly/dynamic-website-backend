const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const { ServerApiVersion } = require('mongodb');

const db = require('./models');

const authRouter = require('./routes/auth');
const readingListRouter = require('./routes/reading-list');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000/',
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'reading-list-extension',
    secret: process.env.COOKIE_SESSION_SECRET,
  })
);
app.use(cookieParser());

db.mongoose
  .connect(
    `mongodb+srv://reading-list:${process.env.PASSWORD}@cluster0.ptjwk.mongodb.net/reading-list?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    }
  )
  .then(() => {
    console.log('db connected');
  })
  .catch(() => {
    console.error('db connection error');
    process.exit();
  });

app.use('/', readingListRouter);
app.use('/auth', authRouter);

module.exports = app;
