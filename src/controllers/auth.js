const jwt = require('jsonwebtoken');
const config = require('../config/environment');
const github = require('../helpers/github');
const User = require('../models/user');


const createJWTToken = data => jwt.sign(
  data, config.jwt.key, { expiresIn: config.jwt.expire },
);

const createSuccessMessage = (user, token) => {
  const api_token = createJWTToken({ login: user.login, email: user.email, id: user.id }); // eslint-disable-line
  const github_token = token; // eslint-disable-line
  const login = user.login;

  return {
    api_token,
    github_token,
    login,
  };
};

const getUser = (githubData) => new Promise((resolve, reject) => {
  const userData = {
    login: githubData.login,
  };

  return User.findOne(userData).then((user) => {
    if (user === null) {
      return reject('User could not be found!');
    }

    return resolve(createSuccessMessage(user, githubData.token));
  }).catch((err) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(err); // eslint-disable-line no-console
    }

    return createUser(githubData).then(resolve, reject);
  });
});

const createUser = (githubData) => new Promise((resolve, reject) => {
  const userData = {
    login: githubData.login,
    email: githubData.email,
    id: githubData.id,
  };

  const newUser = new User(userData);

  return newUser.save()
    .then(user => resolve(createSuccessMessage(user, githubData.token)))
    .catch(reject);
});


const AuthController = {};

AuthController.authenticate = url => new Promise((resolve, reject) => {
  return github.prepare(url).then(() => {;
    return getUser(github.data)
      .then(resolve, reject)
      .catch((err) =>  {
        if (process.env.NODE_ENV === 'development') {
          console.log(err); // eslint-disable-line no-console
        }
      });
  });
});


module.exports = AuthController;
