export const defaultOperatorNames = {
  eq: 'is exactly',
  ne: 'is not',
  gt: 'is greater than',
  lt: 'is less than',
  ge: 'is greater than or equal',
  le: 'is less than or equal',
  in: 'is any of',
  nin: 'is none of',
  em: 'is empty',
  nem: 'is not empty',
  cs: 'contains',
  ncs: 'does not contain',
  bet: 'is between',
  true: 'is true',
  false: 'is false',
};

export const operatorNamesForDate = {
  ...defaultOperatorNames,
  lt: 'is before',
  gt: 'is after',
  eq: 'is exactly',
};

export const logicalOperatorNames = {
  and: 'And',
  or: 'Or',
};

export const listValueOperators = [
  'in',
  'nin',
];

export const noValueOperators = ['em', 'nem'];

const getValue = (singleValue) => {
  if (singleValue instanceof Date) {
    return singleValue.toISOString();
  }
  return singleValue;
};

const makeFilterValue = (value) => {
  if (!value) return '';
  if (Array.isArray(value)) {
    return value.map(getValue).join(',');
  }
  return getValue(value);
};

export const simpleQStringify = (qsAry) => {
  return `?${qsAry.map(({ name, value }) => `${name}=${value}`).join('&')}`;
};

// bullshit for how query-string formats querystrings
export const simpleQSObjectify = (qsAry) => {
  return qsAry.reduce((memo, { name, value }) => {
    if (memo[name] && Array.isArray(memo[name])) {
      memo[name].push(value);
    } else if (memo[name]) {
      memo[name] = [memo[name], value];
    } else {
      memo[name] = value;
    }

    return memo;
  }, {});
};

export const makeQuerystringFilters = (filterState, sectionFilters = {}, strict = false) => {
  const filters = filterState.filters.filter(filter => (
    (!strict || (strict && filter.operator))
        && (!strict || ((strict && filter.value) || (strict && noValueOperators.includes(filter.operator))))
  ));

  const qsAry = Object.entries(sectionFilters).map(([name, value]) => ({ name, value }));

  filters.forEach((filter) => {
    const name = `filter[${filter.column || ''}]`;
    const filterValue = makeFilterValue(filter.value);
    const value = `${filter.operator || ''}${filterValue ? `:${filterValue}` : ''}`;
    qsAry.push({ name, value });
  });

  if (filters.length > 1 && filterState.logicalOperator) {
    qsAry.push({ name: 'exp', value: filterState.logicalOperator });
  }
  return qsAry;
};

export const simpleQSParse = (qs) => {
  return qs.replace(/^\?/, '').split('&').reduce((acc, pair) => {
    const [key, value] = pair.split('=');
    acc.push({ key, value });
    return acc;
  }, []);
};

export const parseQuerystringFilters = (qsText) => {
  const qs = simpleQSParse(qsText);

  const filterState = {
    filters: [],
    logicalOperator: 'and',
  };

  qs.forEach(({ key, value: queryValue }) => {
    const filterMatch = key.match(/^filter\[(.*)\]/);
    if (filterMatch) {
      const [_, column] = filterMatch;
      const colonPos = queryValue.indexOf(':');
      const end = colonPos === -1 ? queryValue.length : colonPos;
      const operator = queryValue.substring(0, end);
      const value = colonPos === -1
        ? undefined
        : decodeURIComponent(queryValue.substring(colonPos + 1));
      const filter = { column, operator };
      if (value) {
        if (listValueOperators.includes(operator)) {
          filter.value = value.split(',');
        } else {
          filter.value = value;
        }
      }
      filterState.filters.push(filter);
    } else if (key === 'exp') {
      filterState.logicalOperator = queryValue;
    }
  });

  return filterState;
};

export const getAutocompleteValues = column => items => items.map((item) => {
  const keyArray = column.value.split('.').slice(1);
  const label = keyArray.reduce((assoc, key) => assoc[key], item);
  return {
    value: item.id,
    label,
  };
});

export const getCommunityAutocompleteValues =  items => items.map((item) => {
  const label = `${item.name}: ${item.address.city}, ${item.address.state}`;
  return {
    value: item.id,
    label,
  };
});

export const getUserAutocompleteValues =  items => items.map(({ id, name }) => ({
  label: name,
  value: id,
}));
