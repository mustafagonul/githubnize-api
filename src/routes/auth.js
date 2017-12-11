
// const { AuthController } = require('../controllers/auth');
const github = require('../helpers/github');
const router = require('express').Router();

/**
 * GET /auth
 */
router.get('/', (req, res) => {
  /*
  const resolve = data => res.status(201).json(data); // TODO mustafa: use boom
  const reject = error => res.status(400).json(error); // TODO mustafa: use boom

  const { email } = req.body.email;
  const { password } = req.body.password;

  AuthenticateController.authenticate(email, password)
    .then(resolve, reject);
  */

  res.redirect(github.url);
});

/*
 * POST /auth/callback
 */
router.get('/callback', (req, res) => {
  res.redirect('/');

  github.setCodeFromUrl(req.url);

  github.getToken();

  console.log(github.token);
});


module.exports = router;
