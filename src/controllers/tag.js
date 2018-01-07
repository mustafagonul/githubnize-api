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


TagController.getRepos = (login, slug) => new Promise((resolve, reject) => {
  const data = { login, slug };

  Repo.findOne(data)
    .then((repos) => {
      if (repos === null) {
        return resolve([]);
      }

      resolve(repos);
    })
    .catch(reject);
});


TagController.createTag = (login, name) => new Promise((resolve, reject) => {
  const data = { login, name };

  const newTag = new Tag(data);

  newTag.save().then(resolve).catch(reject);
});


TagController.createRepo = (login, slug, repo) => new Promise((resolve, reject) => {
  const data = { login, slug, repo };

  const newRepo = new Repo(data);

  newRepo.save().then(resolve).catch(reject);
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
