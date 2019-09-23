import build from 'redux-object';

export const normJsonApi = (resp) => {
  const { data, included } = resp.body;
  let normalizedResult = [];
  let result = data.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = {};
    }
    acc[item.type][item.id] = item;
    return acc;
  }, {});
  if (included) {
    result = included.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = {};
      }
      acc[item.type][item.id] = item;
      return acc;
    }, result);
  }

  const ids = normalizedResult.map(({ id }) => id);
  normalizedResult = data.reduce((acc, elem) => {
    if (!ids.includes(elem.id)) {
      acc.push(build(result, elem.type, elem.id, { eager: true }));
    }
    return acc;
  }, normalizedResult);
  return normalizedResult;
};
