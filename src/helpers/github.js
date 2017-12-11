const config = require('../config/environment');
// const fetch = require('node-fetch');
const request = require('request');
const url = require('url');
const qs = require('querystring');


class GitHub {
  constructor() {
    this.client_id = config.github.client_id;
    this.client_secret = config.github.client_secret;
    this.url = `https://github.com/login/oauth/authorize?client_id=${this.client_id}&scope=user`;
    this.access_url = 'https://github.com/login/oauth/access_token';
    this.code = null;
    this.token = null;
  }

  setCodeFromUrl(u) {
    const data = url.parse(u, true).query;

    this.code = data.code;
  }

  getToken() {
    request({
      url: this.access_url,
      method: 'POST',
      body: qs.stringify({
        code: this.code,
        client_id: this.client_id,
        client_secret: this.client_secret,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'githubnize-api',
      },
    }, (err, res, body) => {
      console.log(body);

      // TODO: correct here
      const data = url.parse(body, false).query;
      this.token = data.access_token;
    });
  }
}


module.exports = new GitHub();
