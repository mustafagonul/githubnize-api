const express = require('express');
const auth = require('./auth');
const tag = require('./tag');
const repo = require('./repo');
const authMiddleware = require('../middlewares/auth');

const routes = () => {
  const api = express.Router();

  api.get('/', (req, res) => res.json({ 'Don\'t Worry': 'All is Well!' }));

  api.use('/auth', auth);

  api.use(authMiddleware);
  api.use('/tag', tag);
  api.use('/repo', repo);

  // Not Found
  api.all('*', (req, res) => {
    res.sendStatus(404);
  });

  return api;
};

module.exports = routes;
