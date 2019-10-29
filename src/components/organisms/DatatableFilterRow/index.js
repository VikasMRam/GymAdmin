import React, { Component } from 'react';
import { func, number, object, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';

import { Box } from 'sly/components/atoms';
import filterPropType from 'sly/propTypes/datatableFilter';
import datatableColumnsPropType from 'sly/propTypes/datatableColumns';
import ButtonLink from 'sly/components/molecules/ButtonLink';
import Field from 'sly/components/molecules/Field';
import {
  noValueOperators,
  listValueOperators,
  operatorNames,
  getAutocompleteValues,
} from 'sly/services/datatable/helpers';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import { size, palette } from 'sly/components/themes';

const AUTOCOMPLETE = 'MultiSelectDynamicList';
const SELECT = 'MultiSelectStaticList';
const DATE_TIME = 'DateTime';

const getValuesFor = (filter, name, value) => {
  switch (name) {
    case 'column': return {};
    case 'operator': return {
      column: filter.column,
      value: noValueOperators.includes(value)
        ? undefined
        : filter.value,
    };
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

const ifAry = func => value => Array.isArray(value)
  ? value.map(func)
  : func(value);

const parseDateValue = ifAry(value => value && dayjs(value, 'YYYY-MM-DD').toDate());
const stringifyDateValue = ifAry(value => dayjs(value).format('YYYY-MM-DD'));

const Row = styled(mobileOnly(Box, css` 
  box-shadow: 0 ${size('spacing.small')} ${size('spacing.small')} ${palette('slate', 'filler')}80;
  flex-wrap: wrap;
  padding: ${size('spacing.regular')};
  padding-bottom: 0;
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
  border: 0;
  padding: 0;
  align-items: center;
  > * {
    margin-bottom: 0;
  }
`))`
  display: flex;
  font-size: ${size('text.caption')};
  line-height: ${size('lineHeight.caption')};
  margin-bottom: ${size('spacing.regular')};
`;

const CloseButton = styled(mobileOnly(ButtonLink, css`
  margin: 0 ${size('spacing.regular')} ${size('spacing.regular')} 0; 
  order: 1;
  display: flex; 
  align-items: center;
`, css`
  margin: 0 ${size('spacing.large')} 0 0; 
  width: ${size('icon.regular')};
`))`
  flex-grow: 0;
  flex-shrink: 0;
`;

const Where = styled(mobileOnly('div', css`
  padding: 0 ${size('spacing.large')};
  margin: 0 ${size('spacing.regular')} ${size('spacing.regular')} 0; 
  height: ${size('element.small')};
  line-height: ${size('element.small')};
  background: ${palette('grey.background')};
  border-radius: ${size('spacing.small')};
`, css`
  width: 70px; 
  margin-right: ${size('spacing.regular')};
`))`
  flex-grow: 0;
  flex-shrink: 0;
`;

const SmallField = styled(Field)`
  margin: 0 ${size('spacing.regular')} 0 0; 
`;

const WhereField = styled(mobileOnly(SmallField, css``, css`
  width: 70px;
`))`
  flex-grow: 0;
  flex-shrink: 0;
`;

const GrowField = mobileOnly(SmallField, css`
  flex-grow: 1;
`, css`
  min-width: 140px;
`);

const SplitFlex = styled.div`
  width: 100%;
  height: 0;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`;

export default class DatatableFilterRow extends Component {
  static propTypes = {
    index: number.isRequired,
    autocompleteFilters: object,
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
      ({ value } = option);
    }
    this.onValueChange(name, value);
  };

  onValueChange = (name, value) => {
    const { filter, onFilterChange } = this.props;
    const values = getValuesFor(filter, name, value);
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

  getValueForAutocomplete = (value = [], column) => {
    const { autocompleteFilters } = this.props;
    const fromFilters = autocompleteFilters[column.paramKey] || [];
    return getAutocompleteValues(column)(fromFilters.filter(({ id }) => value.includes(id)));
  };

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
        value: this.getValueForAutocomplete(value, this.state.columns[column]),
        isMulti: listValueOperators.includes(operator),
        onChange: option => this.onSelectChange(option, { name: 'value' }),
      };
      case DATE_TIME: return {
        type: operator === 'bet' ? 'daterange' : 'date',
        value: parseDateValue(value),
        onChange: value => this.onValueChange('value', stringifyDateValue(value)),
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
        <CloseButton onClick={() => onFilterRemove(filter)} palette="slate" icon="close" size="caption" />

        {index === 0 && (
          <Where>Where</Where>
        )}

        {index === 1 && (
          <WhereField
            size="small"
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
          size="small"
          name="column"
          value={filter.column}
          type="choice"
          onChange={this.onSelectChange}
          options={this.getColumns()}
        />


        {filter.column && (
          <>
            <SplitFlex />
            <GrowField
              size="small"
              name="operator"
              value={filter.operator}
              type="choice"
              onChange={this.onSelectChange}
              options={this.getOperatorsFor(filter.column)}
            />
          </>
        )}

        {filter.operator && !noValueOperators.includes(filter.operator) && (
          <GrowField
            name={`${filter.column}:${filter.operator}`}
            size="small"
            column={columns[filter.column]}
            {...this.getValuePropsFor(filter)}
          />
        )}
      </Row>
    );
  }
}
