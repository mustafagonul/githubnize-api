const router = require('express').Router();
const RepoController = require('../controllers/repo');

/**
 * GET /repo/:owner/:repo
 */
router.get('/:owner/:repo', (req, res) => {
  const resolve = data => res.status(200).json(data);
  const reject = error => res.status(500).json(error);

  const login = req.user.login;
  const owner = req.params.owner;
  const repo = req.params.repo;

  RepoController.getRepoTags(login, owner, repo).then(resolve, reject);
});


/**
 * POST /repo
 */
router.post('/', (req, res) => {
  const resolve = data => res.status(200).json(data);
  const reject = error => res.status(500).json(error);

  const login = req.user.login;
  const owner = req.body.owner;
  const repo = req.body.repo;
  const slug = req.body.slug;

  RepoController.createRepo(login, owner, repo, slug).then(resolve, reject);
});

/**
 * DELETE /repo/:owner/:slug
 */
router.delete('/:owner/:repo/:slug', (req, res) => {
  const resolve = data => res.status(200).json(data);
  const reject = error => res.status(500).json(error);

  const login = req.user.login;
  const owner = req.params.owner;
  const repo = req.params.repo;
  const slug = req.params.slug;

  RepoController.removeRepo(login, owner, repo, slug).then(resolve, reject);
});


module.exports = router;
