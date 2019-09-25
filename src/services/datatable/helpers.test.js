import { parseQuerystringFilters, makeQuerystringFilters } from './helpers';

describe('datatables helpers', () => {
  it('should parse querystring params into filterState object', () => {
    const qs = '?filter[admin]=eq:true&filter[name]=cs:test&filter[email]=nem&exp=or';
    const filterState = parseQuerystringFilters(qs);
    expect(filterState).toStrictEqual({
      filters: [{
        column: 'admin',
        operator: 'eq',
        value: 'true',
      }, {
        column: 'name',
        operator: 'cs',
        value: 'test',
      }, {
        column: 'email',
        operator: 'nem',
      }],
      logicalOperator: 'or',
    });
  });

  it('should parse querystring with array of values', () => {
    const qs = '?filter[state]=nin:1st Contact Attempt,2nd Contact Attempt';
    const filterState = parseQuerystringFilters(qs);
    expect(filterState).toStrictEqual({
      filters: [{
        column: 'state',
        operator: 'nin',
        value: [
          '1st Contact Attempt',
          '2nd Contact Attempt',
        ],
      }],
      logicalOperator: 'and',
    });
  });

  it('should parse filterState object into querystring params', () => {
    const filterState = {
      filters: [{
        column: 'admin',
        operator: 'eq',
        value: 'true',
      }, {
        column: 'email',
        operator: 'nem',
      }, {
        column: 'name',
        operator: 'cs',
        value: 'test',
      }],
      logicalOperator: 'or',
    };

    const qsObject = makeQuerystringFilters(filterState);
    expect(qsObject).toEqual({
      'filter[admin]': 'eq:true',
      'filter[email]': 'nem',
      'filter[name]': 'cs:test',
      exp: 'or',
    });
  });

  it('should not ignore empty filters', () => {
    const filterState = {
      filters: [{
      }, {
        column: 'email',
      }, {
        column: 'name',
        operator: 'cs',
      }],
      logicalOperator: 'or',
    };

    const qsObject = makeQuerystringFilters(filterState);
    expect(qsObject).toEqual({ 'filter[email]': '', 'filter[name]': 'cs', exp: 'or' });
  })
});
