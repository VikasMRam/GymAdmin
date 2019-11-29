import build from 'redux-object';

export const normalizeResponse = ({ data, included = [] }) => {
  if (!data) return data;

  const resultEntities = Array.isArray(data)
    ? data
    : [data];

  const entities = [...resultEntities, ...included];

  const result = entities.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = {};
    }
    acc[item.type][item.id] = item;
    return acc;
  }, {});

  const buildElem = elem => build(result, elem.type, elem.id, { eager: true });

  if (Array.isArray(data)) {
    return resultEntities.map(buildElem);
  }

  return buildElem(data);
};

