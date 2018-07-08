const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const apiRoutes = express.Router();
const bodyParser = require('body-parser');
const router = require('./router');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.static(path.join(__dirname)));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.listen(port, function () {
  console.log('listening on port ' + port);
});

mongoose.connect('mongodb://skeleton:password1@ds131601.mlab.com:31601/skeleton', { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log('connected to mongo');
  }
});

router(app);