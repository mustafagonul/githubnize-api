const router = require('express').Router();
const config = require('../config/environment');
const AuthController = require('../controllers/auth');


/*
 * GET /auth/callback
 */
router.get('/callback', (req, res) => {
  const resolve = (data) => {
    const payload = Buffer.from(data.login).toString('base64');
    const url = `${config.client.authCallback}?api_token=${data.api_token}&github_token=${data.github_token}&payload=${payload}`;

    if (process.env.NODE_ENV === 'development') {
      console.log('/auth/callback resolve'); // eslint-disable-line no-console
      console.log('url: ', url); // eslint-disable-line no-console
    }


    res.redirect(302, url);
  };

  const reject = (error) => {
    const payload = Buffer.from(JSON.stringify(error)).toString('base64');
    const url = `${config.client.authCallback}?error=${payload}`;

    if (process.env.NODE_ENV === 'development') {
      console.log('/auth/callback resolve'); // eslint-disable-line no-console
      console.log('error: ', error); // eslint-disable-line no-console
      console.log('url: ', url); // eslint-disable-line no-console
    }

    res.redirect(302, url);
  };

  AuthController.authenticate(req.url).then(resolve, reject);
});


module.exports = router;
