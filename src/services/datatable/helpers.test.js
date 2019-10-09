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
    expect(qsObject).toEqual([{
      name: 'filter[admin]',
      value: 'eq:true',
    },
    {
      name: 'filter[email]',
      value: 'nem',
    },
    {
      name: 'filter[name]',
      value: 'cs:test',
    },
    {
      name: 'exp',
      value: 'or',
    }]);
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
    expect(qsObject).toEqual([{
      name: 'filter[]',
      value: '',
    },
    {
      name: 'filter[email]',
      value: '',
    },
    {
      name: 'filter[name]',
      value: 'cs',
    },
    {
      name: 'exp',
      value: 'or',
    }]);
  });
});
