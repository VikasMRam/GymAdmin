import React, { Component } from 'react';
import { func, number, oneOf } from 'prop-types';
import { css } from 'styled-components';

import filterPropType from 'sly/propTypes/datatableFilter';
import datatablePropType from 'sly/propTypes/datatable';
import { Span } from 'sly/components/atoms';
import ButtonLink from 'sly/components/molecules/ButtonLink';
import Field from 'sly/components/molecules/Field';
import { noValueOperators } from 'sly/services/helpers/datatable';
import mobileOnly from 'sly/components/helpers/mobileOnly';

const SELECT = 'MultiSelectStaticList';
const DATE_TIME = 'DateTime';

const operatorNames = {
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

const getValuesFor = (filter, name) => {
  switch (name) {
    case 'column': return {};
    case 'operator': return { column: filter.column };
    default: return filter;
  }
};

const Row = mobileOnly('div', css` 
  display: flex;
  flex-wrap: wrap;
`, css`
  display: table-row; 
  > * {
    display: table-cell;
  }
`);

const CloseButton = mobileOnly(ButtonLink, css`
  flex-grow: 0;
  order: 1;
`, css`

`);

const Where = mobileOnly('div', css`
  flex-grow: 0;
`, css`
  
`);

const GrowField = mobileOnly(Field, css`
  flex-grow: 1;
`, css`

`);

const ConditionCell = mobileOnly('div', css`
  display: flex;
  flex-basis: 100%;
  order: 2;
`, css`

`);

const Condition = mobileOnly('div', css`

`, css`
  display: flex;
`);

export default class DatatableFilterRow extends Component {
  static propTypes = {
    index: number.isRequired,
    onFilterChange: func.isRequired,
    logicalOperator: oneOf(['and', 'or']),
    onLogicalOperatorChange: func,
    onRemove: func.isRequired,
    filter: filterPropType.isRequired,
    datatable: datatablePropType.isRequired,
  };

  state = {
    columns: this.props.datatable.columns.reduce((acc, column) => {
      if (!column.paramKey) return acc;
      acc[column.paramKey] = column;
      return acc;
    }, {}),
  };

  onSelectChange = ({ value }, { name }) => {
    this.onValueChange(name, value);
  };

  onFieldChange = (event) => {
    const { name, value } = event.target;
    this.onValueChange(name, value);
  };

  onValueChange = (name, value) => {
    const { filter, onFilterChange } = this.props;
    const values = getValuesFor(filter, name);
    onFilterChange(filter, { ...values, [name]: value });
  };

  getColumns = () => {
    const { datatable } = this.props;
    return datatable.columns.filter(column => column.isFilterable).map(({ label, paramKey }) => ({
      label,
      value: paramKey,
    }));
  };

  getOperatorsFor = column => this.state.columns[column]
    .type.allowedExpressions
    .map(op => ({
      label: operatorNames[op],
      value: op,
    }));

  getValuePropsFor = ({ column, value }) => {
    const { type, typeInfo } = this.state.columns[column];
    switch (type.name) {
      case SELECT: return {
        type: 'select',
        value,
        options: typeInfo.list.map(value => ({ label: value, value })),
        onChange: this.onSelectChange,
      };
      case DATE_TIME: return {
        type: 'date',
        onChange: value => this.onValueChange('value', value),
        value,
      };
      default: return {
        type: 'text',
        value: value || '',
        onChange: this.onFieldChange,
      };
    }
  };

  render() {
    const {
      onRemove,
      filter,
      onLogicalOperatorChange,
      logicalOperator,
      index,
    } = this.props;

    return (
      <Row>
        <CloseButton onClick={() => onRemove(filter)} icon="close" />

        <Where>
          {index === 0 && (
            <Span>Where</Span>
          )}

          {index === 1 && (
            <Field
              name="logicalOperator"
              type="select"
              value={logicalOperator}
              onChange={({ value }) => onLogicalOperatorChange(value)}
              options={[
                { label: 'And', value: 'and' },
                { label: 'Or', value: 'or' },
              ]}
            />
          )}

          {index !== 0 && index !== 1 && (
            <Span>{operatorNames[logicalOperator]}</Span>
          )}
        </Where>

        <GrowField
          name="column"
          value={filter.column}
          type="select"
          onChange={this.onSelectChange}
          options={this.getColumns()}
        />

        <ConditionCell>
          <Condition>
            {filter.column && (
              <Field
                name="operator"
                value={filter.operator}
                type="select"
                onChange={this.onSelectChange}
                options={this.getOperatorsFor(filter.column)}
              />
            )}

            {filter.operator && !noValueOperators.includes(filter.operator) && (
              <Field
                name="value"
                onChange={this.onDateChange}
                {...this.getValuePropsFor(filter)}
              />
            )}
          </Condition>
        </ConditionCell>
      </Row>
    );
  }
}


