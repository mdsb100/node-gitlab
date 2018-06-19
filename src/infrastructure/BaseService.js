import URLJoin from 'url-join';
import Request from 'request-promise';

class BaseModel {
  constructor({
    url = 'https://gitlab.com', token, oauthToken, requester = Request,
  } = {}) {
    this.url = URLJoin(url, 'api', 'v4');
    this.headers = {};
    this.requester = requester;

    if (oauthToken) {
      this.headers.authorization = `Bearer ${oauthToken}`;
    } else if (token) {
      this.headers['private-token'] = token;
    } else {
      throw new Error('`token` (private-token) or `oauth_token` is mandatory');
    }
  }
}

export default BaseModel;
