export const operatorNames = {
  eq: 'equal',
  ne: 'not equal',
  gt: 'greater than',
  lt: 'less than',
  ge: 'greater than equal',
  le: 'less than equal',
  in: 'in',
  nin: 'not in',
  bef: 'before',
  aft: 'after',
  is: 'is',
  bet: 'between',
  em: 'empty',
  nem: 'not empty',
  cs: 'contains',
  ncs: 'not contains',
  and: 'And',
  or: 'Or',
};

export const listValueOperators = [
  'in',
  'nin',
  'bet',
];

export const noValueOperators = ['em', 'nem'];

const getValue = (singleValue) => {
  if (singleValue instanceof Date) {
    return singleValue.toISOString();
  }
  return encodeURIComponent(singleValue);
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
      const [operator, rawValue] = queryValue.split(':');
      const value = rawValue
        ? decodeURIComponent(rawValue)
        : undefined;
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
