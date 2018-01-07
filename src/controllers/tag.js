const Tag = require('../models/tag');
const Repo = require('../models/repo');


const TagController = {};


TagController.getTags = login => new Promise((resolve, reject) => {
  const data = { login };

  Tag.find(data, 'name slug').select('-_id')
    .then((tag) => {
      if (tag === null) {
        return resolve([]);
      }

      resolve(tag);
    })
    .catch(reject);
});


TagController.createTag = (login, name) => new Promise((resolve, reject) => {
  const data = { login, name };

  const newTag = new Tag(data);

  newTag.save().then(resolve).catch(reject);
});


TagController.removeTag = (login, slug) => new Promise((resolve, reject) => {
  const data = { login, slug };

  Tag.remove(data)
    .then((err1) => {
      Repo.remove(data)
        .then((err2) => {
          // resolve(); // TODO mustafa
        })
        .catch(reject); // TODO mustafa

      resolve();
    })
    .catch(reject); // TODO mustafa
});


/*
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
*/


module.exports = TagController;
