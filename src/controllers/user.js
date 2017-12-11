const bcrypt = require('bcryptjs');
const { User } = require('../models/user');
const githubapi = require('../helpers/github');

const UserController = {};

UserController.create = data => new Promise((resolve, reject) => {

  githubapi.searchEmail(data.email)
    .then(resolve, reject);

  /*
  const hashPassword = bcrypt.hashSync(data.password);

  const usersData = {
    name: data.name,
    email: data.email,
    password: hashPassword,
  };

  const newUser = new User(usersData);

  newUser.save()
    .then(resolve, reject);
  */
});


UserController.get = data => new Promise((resolve, reject) => {
  const usersData = {
    slug: data,
  };

  User.findOne(usersData)
    .then((user) => {
      if (user === null) {
        return reject();
      }

      resolve(user);
    })
    .catch(reject);
});


UserController.list = () => new Promise((resolve, reject) => {
  User.find()
    .then(resolve, reject);
});


UserController.update = (slug, data) => new Promise((resolve, reject) => {
  const updated = data;

  delete updated._id;   // eslint-disable-line
  delete updated.__v;   // eslint-disable-line

  if (data.password) {
    updated.password = bcrypt.hashSync(data.password);
  }

  User.findOneAndUpdate({ slug }, updated, { new: true })
    .then((user) => {
      if (user === null) {
        return reject();
      }

      return resolve(user);
    })
    .catch(reject);
});


module.exports = UserController;
