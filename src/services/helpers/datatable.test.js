import { parseQuerystringFilters, makeQuerystringFilters } from './datatable';

describe('datatables helpers', () => {
  it('should parse querystring params into filterState object', () => {
    const filterState = parseQuerystringFilters({
      'filters[admin]': 'eq:true',
      'filters[name]': 'cs:test',
      'filters[email]': 'nem',
      exp: 'or',
    });
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
      'filters[name]': 'cs:test',
      'filters[admin]': 'eq:true',
      'filters[email]': 'nem',
      exp: 'or',
    });
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
    expect(qsObject).toEqual({
      exp: 'or',
    });
  })
});
