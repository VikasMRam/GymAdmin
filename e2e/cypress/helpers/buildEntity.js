const normalize = require('json-api-normalizer').default;
const build = require('redux-object').default;

const toLowerFirst = word => `${word.charAt(0).toLowerCase()}${word.slice(1)}`;

function buildEntity(response) {
  const normalized = normalize(response);
  if (Array.isArray(response.data)) {
    return response.data.map(({ type, id }) => build(normalized, toLowerFirst(type), id, { eager: true }));
  }
  return build(normalized, toLowerFirst(response.data.type), response.data.id, { eager: true });
}

exports.default = buildEntity;

// if (!module.parent) {
//   // main so we are trying to build an entity from a response json
//   const responseText = require('fs').readFileSync(process.argv[2], 'utf8');
//   const response = JSON.parse(responseText);
//   const entities = buildEntity(response);
//   console.log(JSON.stringify(entities, null, 2));
// }
