import React, { Component } from 'react';
import { object } from 'prop-types';
import styled, { css } from 'styled-components';

import { Box } from 'sly/components/atoms';
import { size, palette } from 'sly/components/themes';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import DatatableFilterRow from 'sly/components/organisms/DatatableFilterRow';
import ButtonLink from 'sly/components/molecules/ButtonLink';
import IconButton from 'sly/components/molecules/IconButton';

const Wrapper = styled(mobileOnly(Box,
  css`
    border: none; 
  `,
  css`
    box-shadow: 0 ${size('spacing.small')} ${size('spacing.small')} ${palette('slate', 'filler')}80;
  `
))`
  background: ${palette('white.base')};
`;

const Table = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: table;
    width: ${size('layout.col7')};
    border-collapse: separate;
    border-spacing: ${size('spacing.regular')};
  }
`;

const PopoverFooter = mobileOnly('div', css`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: ${size('border.regular')} solid ${palette('grey', 'filler')};
  padding: ${size('spacing.regular')} ${size('spacing.large')};
  > * {
    width: 100%;
  }
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`);

export default class DatatableFilters extends Component {
  static propTypes = {
    autocompleteFilters: object,
    datatable: object,
  };

  render() {
    const { datatable, autocompleteFilters, ...props } = this.props;
    const { onFilterChange, onFilterRemove, onLogicalOperatorChange } = datatable;
    const { filters, logicalOperator } = datatable.filterState;
    return (
      <Wrapper {...props}>
        <Table>
          {filters.map((filter, i) => (
            /* eslint-disable react/no-array-index-key */
            <DatatableFilterRow
              key={`${filter.column || i}_${i}`}
              index={i}
              autocompleteFilters={autocompleteFilters}
              onFilterChange={onFilterChange}
              onFilterRemove={onFilterRemove}
              onLogicalOperatorChange={onLogicalOperatorChange}
              logicalOperator={logicalOperator}
              filter={filter}
              columns={datatable.columns}
            />
          ))}
        </Table>

        <ButtonLink
          icon="add"
          palette="primary"
          size="caption"
          onClick={datatable.addFilter}
        >
          Add filter
        </ButtonLink>
      </Wrapper>
    );
  }
}
