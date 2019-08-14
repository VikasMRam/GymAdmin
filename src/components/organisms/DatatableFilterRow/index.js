import React, { Component } from 'react';
import { arrayOf, func, number, oneOf } from 'prop-types';
import styled from 'styled-components';

import filterPropType from 'sly/propTypes/datatableFilter';
import datatablePropType from 'sly/propTypes/datatable';
import IconButton from 'sly/components/molecules/IconButton';
import Field from 'sly/components/molecules/Field';

const Row = 'form';

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

const noValue = ['em', 'nem'];

const getValuesFor = (filter, name) => {
  switch (name) {
    case 'column': return {};
    case 'operator': return { column: filter.column };
    default: return filter;
  }
};

const Where = styled.div`

`;

export default class DatatableFilterRowForm extends Component {
  static propTypes = {
    index: number.isRequired,
    logicalOperator: oneOf(['and', 'or']),
    onLogicalOperatorChange: func,
    onRemove: func.isRequired,
    onChange: func.isRequired,
    filter: filterPropType.isRequired,
    datatable: datatablePropType.isRequired,
  };

  state = {
    columns: this.props.datatable.columns.reduce((acc, column) => {
      acc[column.value] = column;
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
    const { filter, onChange } = this.props;
    const values = getValuesFor(filter, name);
    onChange(filter, { ...values, [name]: value });
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
    const { onRemove, filter, datatable, onLogicalOperatorChange, logicalOperator, index } = this.props;
    console.log('logicalOperator', logicalOperator);
    return (
      <Row>
        <IconButton onClick={() => onRemove(filter)} icon="clear" />

        {index === 0 && (
          <Where>Where</Where>
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
          <Where>{operatorNames[logicalOperator]}</Where>
        )}

        <Field
          name="column"
          value={filter.column}
          type="select"
          onChange={this.onSelectChange}
          options={datatable.columns}
        />

        {filter.column && (
          <Field
            name="operator"
            value={filter.operator}
            type="select"
            onChange={this.onSelectChange}
            options={this.getOperatorsFor(filter.column)}
          />
        )}

        {filter.operator && !noValue.includes(filter.operator) && (
          <Field
            name="value"
            onChange={this.onDateChange}
            {...this.getValuePropsFor(filter)}
          />
        )}
      </Row>
    );
  }
}


