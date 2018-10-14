import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import router from './router';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';

const app = express();
const port = process.env.PORT || config.port;

app.use(express.static(path.join(__dirname)));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(cors());

app.listen(port, () => {
  console.log(`Running on port ${config.port}`);
});

mongoose.connect(
  'mongodb://skeleton:password1@ds131601.mlab.com:31601/skeleton', {
    useNewUrlParser: true
  },
  (err) => {
    if (!err) {
      console.log('connected to mongo');
    }
  });

router(app);