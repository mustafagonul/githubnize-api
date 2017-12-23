const { User } = require('../models/user');

const UserController = {};


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

  // TODO mustafa
  delete updated._id;   // eslint-disable-line
  delete updated.__v;   // eslint-disable-line

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
