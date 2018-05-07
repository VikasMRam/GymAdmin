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

  const idString = id ? `/${id}` : '';
  const queryString = params ? `?${stringify(params)}` : '';

  const path = `/${resourceUri(resource)}${idString}`;
  const uri = `${path}${queryString}`;

  return { 
    resource, 
    id, 
    params, 
    uri, 
    path, 
    queryString 
  };
};

