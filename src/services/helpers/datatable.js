
export const noValueOperators = ['em', 'nem'];


export const makeQuerystringFilters = (filterState) => {
  const qsObject = {};
  filterState.filters.forEach((filter) => {
    if (!filter.column
        || !filter.operator
        || (!filter.value && !noValueOperators.includes(filter.operator))
    ) return;

    const key = `filters[${filter.column}]`;
    const value = `${filter.operator}${filter.value ? `:${filter.value}` : ''}`;
    qsObject[key] = value;
  });
  if (filterState.logicalOperator) {
    qsObject.exp = filterState.logicalOperator;
  }
  return qsObject;
};

export const parseQuerystringFilters = (qs) => {
  const filterState = {
    filters: [],
    logicalOperator: 'and',
  };

  Object.entries(qs).forEach(([key, queryValue]) => {
    const filterMatch = key.match(/^filters\[(.*)\]/);
    if (filterMatch) {
      const [_, column] = filterMatch;
      const [operator, value] = queryValue.split(':');
      const filter = { column, operator };
      if (value) {
        filter.value = value;
      }
      filterState.filters.push(filter);
    } else if (key === 'exp') {
      filterState.logicalOperator = queryValue;
    }
  });

  return filterState;
};
