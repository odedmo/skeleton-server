/* eslint-disable no-console */

import express from 'express';
import User from './models/User';
import auth from './auth';

import bcrypt from 'bcrypt-nodejs';
import jwt from 'jwt-simple';

module.exports = function (app) {

  const apiRoutes = express.Router();

  apiRoutes.get('/users', async (req, res, next) => {
    try {
      const users = await User.find({}, '-password -__v');
      return res.send(users);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  apiRoutes.post('/register', auth.register);

  apiRoutes.post('/login', auth.login);

  app.use('/api', apiRoutes);
};
