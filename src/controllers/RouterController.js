const express = require('express');
const index = express.Router();
const Users = require('./UsersController').default;
const Auth = require('./AuthController').default;
const Country = require('./CountryController').default;
const Movies = require('./MovieController').default;

index.use(async (req, res, next) => {
  next();
})

index.get('/', async (req, res, next) => {
  res.send("Welcome to samECom API.")
})

const router = (app => {
  app.use('/', index);
  app.use('/users', Users);
  app.use('/auth', Auth);
  app.use('/country', Country);
  app.use('/movies', Movies);
})

export default router;