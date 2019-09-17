import React, { Component } from 'react';
import { func, number, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';

import filterPropType from 'sly/propTypes/datatableFilter';
import datatableColumnsPropType from 'sly/propTypes/datatableColumns';
import ButtonLink from 'sly/components/molecules/ButtonLink';
import Field from 'sly/components/molecules/Field';
import { noValueOperators, operatorNames } from 'sly/services/datatable/helpers';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import { size } from 'sly/components/themes';

const SELECT = 'MultiSelectStaticList';
const DATE_TIME = 'DateTime';

const getValuesFor = (filter, name) => {
  switch (name) {
    case 'column': return {};
    case 'operator': return { column: filter.column };
    default: return filter;
  }
};

const Row = styled(mobileOnly('div', css` 
  display: flex;
  flex-wrap: wrap;
  > * {
    margin: 0 ${size('spacing.regular')} ${size('spacing.regular')} 0; 
  }
`, css`
  display: table-row; 
  > * {
    display: table-cell;
  }
`))`
  font-size: ${size('text.caption')};
`;

const CloseButton = mobileOnly(ButtonLink, css`
  flex-grow: 0;
  order: 1;
`, css`

`);

const Where = mobileOnly('div', css`
  flex-grow: 0.5;
  padding: 0 ${size('spacing.large')};
  height: ${size('element.small')};
  line-height: ${size('element.small')};
`, css`
  
`);

const SmallField = styled(Field)`
`;

const WhereField = mobileOnly(SmallField, css`
  flex-grow: 0.5; 
`, css`

`);

const GrowField = mobileOnly(SmallField, css`
  flex-grow: 1;
`, css`

`);

const ConditionCell = mobileOnly('div', css`
  display: flex;
  flex-basis: 100%;
  order: 2;
  > * {
    margin-right: ${size('spacing.regular')};
    flex-grow: 1;
  }
`, css`

`);

const Condition = mobileOnly('div', css`
  display: flex;
  > * {
    flex-grow: 1;
  }
`, css`
  display: flex;
`);

export default class DatatableFilterRow extends Component {
  static propTypes = {
    index: number.isRequired,
    onFilterChange: func.isRequired,
    onFilterRemove: func.isRequired,
    onLogicalOperatorChange: func,
    logicalOperator: oneOf(['and', 'or']),
    filter: filterPropType.isRequired,
    columns: datatableColumnsPropType.isRequired,
  };

  state = {
    columns: this.props.columns.reduce((acc, column) => {
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
    const { columns } = this.props;
    return columns.filter(column => column.isFilterable).map(({ label, paramKey }) => ({
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
        type: 'choice',
        value,
        options: typeInfo.list.map(value => ({ label: value, value })),
        onChange: this.onSelectChange,
      };
      case DATE_TIME: return {
        type: 'date',
        value: value ? dayjs(value, 'YYYY-MM-DD').toDate() : new Date(),
        onChange: value => this.onValueChange('value', dayjs(value).format('YYYY-MM-DD')),
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
      onFilterRemove,
      filter,
      onLogicalOperatorChange,
      logicalOperator,
      index,
    } = this.props;

    return (
      <Row>
        <CloseButton onClick={() => onFilterRemove(filter)} icon="close" />

        {index === 0 && (
          <Where>Where</Where>
        )}

        {index === 1 && (
          <WhereField
            name="logicalOperator"
            type="choice"
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

        <GrowField
          name="column"
          value={filter.column}
          type="choice"
          onChange={this.onSelectChange}
          options={this.getColumns()}
        />

        <ConditionCell>
          {filter.column && (
            <GrowField
              name="operator"
              value={filter.operator}
              type="choice"
              onChange={this.onSelectChange}
              options={this.getOperatorsFor(filter.column)}
            />
          )}

          {filter.operator && !noValueOperators.includes(filter.operator) && (
            <GrowField
              name={filter.column}
              size="small"
              {...this.getValuePropsFor(filter)}
            />
          )}
        </ConditionCell>
      </Row>
    );
  }
}


