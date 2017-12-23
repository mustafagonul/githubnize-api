const config = require('../config/environment');
const fetch = require('node-fetch');
const url = require('url');
const qs = require('querystring');

/*
function objectToQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

function queryStringToObject(queryString) {
  return queryString.split('&').reduce((map, pair) => {
    const [key, value] = pair.split('=');
    map[key] = value; // eslint-disable-line
    return map;
  }, {});
}
*/


class GitHub {
  constructor() {
    this._client_id = config.github.client_id;
    this._client_secret = config.github.client_secret;
    this._access_url = 'https://github.com/login/oauth/access_token';
    this._api_url = 'https://api.github.com';
    this._code = null;
    this._token = null;
    this._login = null;
    this._id = null;
    this._email = null;
  }

  get data() {
    return {
      login: this.login,
      email: this.email,
      token: this.token,
      id: this.id,
    };
  }

  get token() {
    return this._token;
  }

  get login() {
    return this._login;
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  header(customHeader) {
    let headers = {
      Accept: 'application/json',
      'User-Agent': 'githubnize-api',
    };

    if (this._token) {
      headers.Authorization = `Bearer ${this._token}`;
    }

    if (customHeader) {
      headers = {
        ...headers,
        ...customHeader,
      };
    }

    return headers;
  }

  apiUrl(query) {
    return this._api_url + query;
  }

  setUser() {
    return fetch(this.apiUrl('/user'), {
      method: 'GET',
      headers: this.header(),
    }).then((response) => { // eslint-disable-line
      return response.json().then((json) => {
        this._login = json.login;
        this._id = json.id;
        this._email = json.email;

        return Promise.resolve();
      });
    });
  }

  setCode(reqUrl) {
    const data = url.parse(reqUrl, true).query;

    this._code = data.code;
  }

  prepare(reqUrl) {
    this.setCode(reqUrl);

    return fetch(this._access_url, {
      method: 'POST',
      headers: this.header({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      body: qs.stringify({
        code: this._code,
        client_id: this._client_id,
        client_secret: this._client_secret,
      }),
    }).then((response) => { // eslint-disable-line
      return response.json().then((json) => {
        this._token = json.access_token;

        return this.setUser();
      });
    });
  }
}


module.exports = new GitHub();
