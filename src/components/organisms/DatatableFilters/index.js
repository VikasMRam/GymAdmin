import React, { Component } from 'react';
import { object } from 'prop-types';
import styled, { css } from 'styled-components';

import { Box } from 'sly/components/atoms';
import { size, palette } from 'sly/components/themes';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import DatatableFilterRow from 'sly/components/organisms/DatatableFilterRow';
import ButtonLink from 'sly/components/molecules/ButtonLink';

const Wrapper = styled(mobileOnly(Box,
  css`
    border: none; 
  `,
  css`
    display: table;
    width: ${size('layout.col7')};
    border-collapse: separate;
    border-spacing: ${size('spacing.regular')};
  `
))`
  background: ${palette('white.base')};
`;

export default class DatatableFilters extends Component {
  static propTypes = {
    datatable: object,
  };

  render() {
    const { datatable, ...props } = this.props;
    const { onFilterChange, onFilterRemove, onLogicalOperatorChange } = datatable;
    const { filters, logicalOperator } = datatable.filterState;
    return (
      <Wrapper {...props}>
        {filters.map((filter, i) => (
          /* eslint-disable react/no-array-index-key */
          <DatatableFilterRow
            key={`${filter.column || i}_${i}`}
            index={i}
            onFilterChange={onFilterChange}
            onFilterRemove={onFilterRemove}
            onLogicalOperatorChange={onLogicalOperatorChange}
            logicalOperator={logicalOperator}
            filter={filter}
            columns={datatable.columns}
          />
        ))}
        <ButtonLink
          icon="add"
          palette="slate"
          size="caption"
          onClick={datatable.addFilter}
        >
          Add filter
        </ButtonLink>
      </Wrapper>
    );
  }
}
