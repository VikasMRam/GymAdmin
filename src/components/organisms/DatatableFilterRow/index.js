import React, { Component } from 'react';
import { func, number, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';

import { Box } from 'sly/components/atoms';
import filterPropType from 'sly/propTypes/datatableFilter';
import datatableColumnsPropType from 'sly/propTypes/datatableColumns';
import ButtonLink from 'sly/components/molecules/ButtonLink';
import Field from 'sly/components/molecules/Field';
import { noValueOperators, listValueOperators, operatorNames } from 'sly/services/datatable/helpers';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import { size, palette } from 'sly/components/themes';
import shadow from 'sly/components/helpers/shadow';

const AUTOCOMPLETE = 'MultiSelectDynamicList';
const SELECT = 'MultiSelectStaticList';
const DATE_TIME = 'DateTime';

const getValuesFor = (filter, name) => {
  switch (name) {
    case 'column': return {};
    case 'operator': return { column: filter.column };
    default: return filter;
  }
};

const valueAndOptionsForSelect = (value, list) => {
  const options = list.map(value => ({ label: value, value }));
  return {
    value: value && options.filter(({ value: ov }) => value.includes(ov)),
    options,
  };
};

const Row = styled(mobileOnly(Box, css` 
  box-shadow: 0 0 ${size('spacing.regular')} ${palette('slate', 'filler')}80;
  display: flex;
  flex-wrap: wrap;
  padding: ${size('spacing.regular')};
  padding-bottom: 0;
  margin-bottom: ${size('spacing.regular')};
  > :first-child {
    order: 1;
  }
  > :nth-child(n+2):nth-child(-n+3) {
    order: 0;
  }
  > :nth-child(n+4) {
    order: 2;
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
  margin: 0 ${size('spacing.regular')} ${size('spacing.regular')} 0; 
  flex-grow: 0;
  order: 1;
  display: flex; 
  align-items: center;
`, css`

`);

const Where = mobileOnly('div', css`
  flex-grow: 0.5;
  padding: 0 ${size('spacing.large')};
  margin: 0 ${size('spacing.regular')} ${size('spacing.regular')} 0; 
  height: ${size('element.small')};
  line-height: ${size('element.small')};
  background: ${palette('grey.background')};
  border-radius: ${size('spacing.small')};
`, css`
  
`);

const SmallField = styled(Field)`
  margin: 0 ${size('spacing.regular')} ${size('spacing.regular')} 0; 
`;

const WhereField = mobileOnly(SmallField, css`
  flex-grow: 0.5; 
`, css`

`);

const GrowField = mobileOnly(SmallField, css`
  flex-grow: 1;
`, css`

`);

const SplitFlex = styled.div`
  width: 100%;
  height: 0;
`;
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

  onSelectChange = (option, { name }) => {
    let value = null;
    if (Array.isArray(option)) {
      value = option.map(({ value }) => value);
    } else if (option && typeof option === 'object') {
      value = option.value;
    }
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

  getValuePropsFor = ({ column, value, operator }) => {
    const { type, typeInfo } = this.state.columns[column];
    switch (type.name) {
      case SELECT: return {
        type: 'choice',
        isMulti: listValueOperators.includes(operator),
        onChange: option => this.onSelectChange(option, { name: 'value' }),
        ...valueAndOptionsForSelect(value, typeInfo.list),
      };
      case AUTOCOMPLETE: return {
        type: 'autocomplete',
        value,
        isMulti: listValueOperators.includes(operator),
        onChange: option => this.onSelectChange(option, { name: 'value' }),
      };
      case DATE_TIME: return {
        type: 'date',
        value: value && dayjs(value, 'YYYY-MM-DD').toDate(),
        onChange: value => this.onValueChange('value', dayjs(value).format('YYYY-MM-DD')),
      };
      default: return {
        type: 'text',
        value: value || '',
        onChange: ({ target: { value } }) => this.onValueChange('value', value),
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

    const { columns } = this.state;

    return (
      <Row>
        <CloseButton onClick={() => onFilterRemove(filter)} palette="slate" icon="close" />

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

        <SplitFlex />
        {/*<ConditionCell>*/}
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
              name={`${filter.column}:${filter.operator}`}
              size="small"
              column={columns[filter.column]}
              {...this.getValuePropsFor(filter)}
            />
          )}
        {/*</ConditionCell>*/}
      </Row>
    );
  }
}


