const express = require('express');
const router = require('./routes');

const app = express();
const port = 3000;

// serve static files
app.use(express.static(__dirname + '/public'));

app.use('/api', router);

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
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

app.listen(port, () => {
  console.log(`App is running on localhost: ${port}`);
});
