const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');

const mongoDB = process.env.MONGODB_URI;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// mongodb connection
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// mongo error
db.on('error', err => {
  console.log(err);
});

// serve static files
app.use(express.static('../client/build'));
// enables all CORS requests
app.use(cors());
// parses all incoming requests with JSON
app.use(express.json());

app.use('/api', router);

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, '/client/build'));
});

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  res.json('Welcome to the Goal Tracker API!');
});

// 404 error handler
app.use((req, res, next) => {
  const err = new Error('Uh oh! Looks like this page does not exist.');
  err.status = 404;
  next(err);
});

// global error handler
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    // console.log();
    const errors = Object.values(err.errors).map(err => {
      return {
        error: err.name,
        message: err.message,
      };
    });

    res.status(400).json(errors);
  } else {
    res.status(err.status || 500).json({
      error: err.name,
      message: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`App is running on localhost: ${port}`);
});
