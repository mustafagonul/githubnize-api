const Repo = require('../models/repo');


const RepoController = {};

RepoController.getRepos = (login, slug) => new Promise((resolve, reject) => {
  const data = { login, slug };

  Repo.find(data)
    .then((repos) => {
      if (repos === null) {
        return resolve([]);
      }

      resolve(repos);
    })
    .catch(reject);
});

RepoController.getRepoTags = (login, owner, repo) => new Promise((resolve, reject) => {
  const data = { login, owner, repo };

  Repo.find(data)
    .then((repos) => {
      if (repos === null) {
        return resolve([]);
      }

      resolve(repos);
    })
    .catch(reject);
});


RepoController.createRepo = (login, owner, repo, slug) => new Promise((resolve, reject) => {
  const data = {
    login, owner, repo, slug,
  };

  console.log(data);

  const newRepo = new Repo(data);

  newRepo.save().then(resolve).catch(reject);
});

RepoController.removeRepo = (login, owner, repo, slug) => new Promise((resolve, reject) => {
  const data = {
    login, owner, repo, slug,
  };

  Repo.remove(data)
    .then((err) => {
      resolve();
    })
    .catch(reject); // TODO mustafa
});


module.exports = RepoController;
