import URLJoin from 'url-join';
import { BaseService, RequestHelper } from '../infrastructure';
import { api } from '../cli/worker';

class ResourceMembers extends BaseService {
  constructor(resourceType, ...args) {
    super(...args);

    this.url = URLJoin(this.url, resourceType);
  }

  @api('<resourceId>', { options: true, method: 'GET' })
  all(resourceId, { excludeInherited = false, query } = {}) {
    const rId = encodeURIComponent(resourceId);

    const url = excludeInherited ? `${rId}/members` : `${rId}/members/all`;

    return RequestHelper.get(this, url, { query });
  }

  @api('<resourceId>', '<userId>', '<accessLevel>', { options: true, method: 'POST' })
  add(resourceId, userId, accessLevel, options) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/members`, {
      user_id: uId,
      access_level: parseInt(accessLevel, 10),
      ...options,
    });
  }

  @api('<resourceId>', '<userId>', '<accessLevel>', { options: true, method: 'PUT' })
  edit(resourceId, userId, accessLevel, options) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.put(this, `${rId}/members/${uId}`, {
      access_level: parseInt(accessLevel, 10),
      ...options,
    });
  }

  @api('<resourceId>', '<userId>', { method: 'GET' })
  show(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.get(this, `${rId}/members/${uId}`);
  }

  @api('<resourceId>', '<userId>', { method: 'DELETE' })
  remove(resourceId, userId) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.delete(this, `${rId}/members/${uId}`);
  }
}

export default ResourceMembers;
