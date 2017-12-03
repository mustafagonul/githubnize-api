const express = require('express');

const routes = () => {
  const api = express.Router();

  api.get('/', (req, res) => res.json({ 'Don\'t Worry': 'All is Well!' }));


  // Not Found
  api.all('*', (req, res) => {
    res.sendStatus(404);
  });

  return api;
};

module.exports = routes;
