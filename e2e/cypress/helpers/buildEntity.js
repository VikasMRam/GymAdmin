import normalize from 'json-api-normalizer';
import build from 'redux-object';

export default function buildEntity(response) {
  const normalized = normalize(response);
  if (Array.isArray(response.data)) {
    return response.data.map(({ type, id }) => build(normalized, type.toLowerCase(), id, { eager: true }));
  }
  return build(normalized, response.data.type.toLowerCase(), response.data.id, { eager: true });
}
