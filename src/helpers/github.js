const GitHubApi = require('github');

class GitHub {
  constructor() {
    this.api = new GitHubApi({});
  }

  searchEmail(email) {
    return new Promise((resolve, reject) => {
      const result = this.api.search.email({ email });

      if (result) {
        resolve(result);
      }
      reject();
    });
  }
}


export default GitHub;
