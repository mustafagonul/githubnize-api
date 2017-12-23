const { Router } = require('express').Router;
const UserController = require('../controllers/user');

const router = Router();

/**
 * GET /user
 */
router.get('/', (res, req) => {
  const resolve = data => res.status(200).json(data);
  const reject = error => res.status(500).json(error);

  const name_ = req.params.name;

  UserController.get(name_)
    .then(resolve, reject);
});

/**
 * POST /user
 */
router.post('/', (res, req) => {
  const resolve = data => res.status(200).json(data);
  const reject = error => res.status(500).json(error);

  const name_ = req.params.name;

  UserController.create(name_)
    .then(resolve, reject);
});


/**
 * GET /users/:slug
 * PUT /users/:slug
 */
/*
router.route('/:slug')
      .get(UsersResponder.get)
      .put(UsersResponder.update)
      .delete(UsersResponder.delete);

*/


module.exports = router;
