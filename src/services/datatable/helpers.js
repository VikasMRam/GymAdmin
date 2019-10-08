import dayjs from 'dayjs';

export const noValueOperators = ['em', 'nem'];

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

export const simpleQStringify = (object) => {
  return `?${Object.entries(object).map(([key, value]) => `${key}=${value}`).join('&')}`;
};

export const makeQuerystringFilters = (filterState, sectionFilters = {}, strict = false) => {
  const filters = filterState.filters.filter(filter => filter.column
        && (!strict || (strict && filter.operator))
        && (!strict || ((strict && filter.value) || (strict && noValueOperators.includes(filter.operator)))));

  const qsObject = { ...sectionFilters };

  filters.forEach((filter) => {
    const key = `filter[${filter.column}]`;
    const filterValue = makeFilterValue(filter.value);
    const value = `${filter.operator || ''}${filterValue ? `:${filterValue}` : ''}`;
    qsObject[key] = value;
  });

  if (filters.length >= 1 && filterState.logicalOperator) {
    qsObject.exp = filterState.logicalOperator;
  }
  return qsObject;
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

  if (filterState.filters.length === 1 && filterState.logicalOperator === 'or') {
    filterState.filters.push({});
  }

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
