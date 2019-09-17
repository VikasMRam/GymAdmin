import build from 'redux-object';

export const normalizeResponse = (resp) => {
  const { data, included } = resp.body;

  const result = [...data, ...included].reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = {};
    }
    acc[item.type][item.id] = item;
    return acc;
  }, {});

  return data.map(elem => build(result, elem.type, elem.id, { eager: true }));
};

