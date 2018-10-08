import { stringify } from 'query-string';
import * as resourceUris from './resourceUris';

const resourceUri = resource => {
  const uri = resourceUris[resource];
  if (!uri) {
    throw new Error(`Unknown resource: ${resource}`);
  }
  return uri;
};

export default function(resource, id, params) {
  if (typeof id === 'object') {
    params = id;
    id = null;
  }
  let idString = id ? `/${id}` : '';
  let queryString = params ? `?${stringify(params, { encode: false })}` : '';
  return `/${resourceUri(resource)}${idString}${queryString}`;
};

