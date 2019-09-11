import { parseQuerystringFilters, makeQuerystringFilters } from './datatable';

describe('datatables helpers', () => {
  it('should parse querystring params into filterState object', () => {
    const qs = '?filters[admin]=eq:true&filters[name]=cs:test&filters[email]=nem&exp=or';
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
    const qs = '?filters[state]=nin:1st Contact Attempt,2nd Contact Attempt';
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
    expect(qsObject).toEqual('?filters[admin]=eq:true&filters[email]=nem&filters[name]=cs:test&exp=or');
  });

  it('should ignore empty filters', () => {
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
    expect(qsObject).toEqual('?exp=or');
  })
});
