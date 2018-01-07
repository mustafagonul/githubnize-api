const router = require('express').Router();
const TagController = require('../controllers/tag');


/**
 * GET /tag
 */
router.get('/', (req, res) => {
  const resolve = data => res.status(200).json(data);
  const reject = error => res.status(500).json(error);

  const login = req.user.login;

  TagController.getTags(login).then(resolve, reject);
});

/**
 * GET /tag/:slug
 */
router.get('/:slug', (req, res) => {
  const resolve = data => res.status(200).json(data);
  const reject = error => res.status(500).json(error);

  const login = req.user.login;
  const slug = req.params.slug;

  TagController.getRepos(login, slug).then(resolve, reject);
});


/**
 * POST /tag
 */
router.post('/', (req, res) => {
  const resolve = data => res.status(200).json(data);
  const reject = error => res.status(500).json(error);

  const login = req.body.login;
  const name = req.body.name;

  TagController.createTag(login, name).then(resolve, reject);
});

/**
 * POST /tag/:slug
 */
router.post('/:slug', (req, res) => {
  const resolve = data => res.status(200).json(data);
  const reject = error => res.status(500).json(error);

  const login = req.user.login;
  const slug = req.params.slug;
  const repo = req.body.repo;

  TagController.updateRepo(login, slug, repo).then(resolve, reject);
});

/**
 * DELETE /tag/:slug
 */
router.delete('/:slug', (req, res) => {
  const resolve = data => res.status(200).json(data);
  const reject = error => res.status(500).json(error);

  const login = req.user.login;
  const slug = req.params.slug;

  TagController.removeTag(login, slug).then(resolve, reject);
});


router.post('/', (req, res) => {
  const resolve = data => res.status(200).json(data);
  const reject = error => res.status(500).json(error);

  const login = req.user.login;
  const slug = req.params.slug;
  const repo = req.body.repo;

  TagController.createRepo(login, slug, repo).then(resolve, reject);
});


/**
 * GET /users/:tagId
 * POST /users/:tagId
 * PUT /users/:tagId
 * DELETE /users/:tagId
 */

/*
router.route('/:tagId')
      .get(TagResponder.get)
      .post(TagResponder.update)
      .put(TagResponder.update)
      .delete(TagResponder.delete);
*/
/*
DELETE /users/:tagId
*/
// router.delete('/:tagId/:repoId', (res, req) => {
//
// });


module.exports = router;
