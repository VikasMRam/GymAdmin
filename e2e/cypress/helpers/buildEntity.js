import normalize from 'json-api-normalizer';
import build from 'redux-object';

export default function buildEntity(response) {
  const normalized = normalize(response);
  if (Array.isArray(response.data)) {
    return response.data.map(({ type, id }) => build(normalized, type.toLowerCase(), id, { eager: true }));
  }
  return build(normalized, response.data.type.toLowerCase(), response.data.id, { eager: true });
}

if (!module.parent) {
  // main so we are trying to build an entity from a response json
  const responseText = require('fs').readFileSync(process.argv[2], 'utf8');
  const response = JSON.parse(responseText);
  const entities = buildEntity(response);
  console.log(JSON.stringify(entities, null, 2));
}
