import React, { Component } from 'react';
import { object } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { Box } from 'sly/web/components/atoms';
import { size, palette } from 'sly/web/components/themes';
import mobileOnly from 'sly/web/components/helpers/mobileOnly';
import DatatableFilterRow from 'sly/web/components/organisms/DatatableFilterRow';
import ButtonLink from 'sly/web/components/molecules/ButtonLink';
import IconButton from 'sly/web/components/molecules/IconButton';

const Wrapper = styled(mobileOnly(Box,
  css`
    border: none; 
    padding: ${size('spacing.large')};
  `,
  css`
    box-shadow: 0 ${size('spacing.small')} ${size('spacing.small')} ${palette('slate', 'filler')}80;
  `,
))`
  background: ${palette('white.base')};
`;

const Table = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col7')};
    border-collapse: separate;
    border-spacing: ${size('spacing.regular')};
  }
`;

const Bottom = styled.div`
  ${ifProp('filtered', css`padding-top: ${size('spacing.regular')}`)};

  & > :nth-child(2) {
    display: none;
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    align-items: center;

    & > :nth-child(1) {
      align-self: start;
    }

    & > :nth-child(2) {
      padding-top: 1px;
      display: block;
      align-self: center;
      min-width: max-content;
      padding-right: ${size('spacing.regular')};
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  width: 100%;
  border-color: ${palette('slate.stroke')};
  justify-content: flex-start;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    border: 0;
    padding-left: ${size('spacing.regular')};
  }
`;

export default class DatatableFilters extends Component {
  static propTypes = {
    autocompleteFilters: object,
    datatable: object,
  };

  render() {
    const { datatable, autocompleteFilters, ...props } = this.props;
    const { onFilterChange, onFilterRemove, onLogicalOperatorChange } = datatable;
    const { filters, logicalOperator } = datatable.filterState;
    const filtered = filters.length > 0;
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

        <Bottom filtered={filtered}>
          <StyledIconButton
            icon="add"
            iconPalette="primary"
            palette="primary"
            size="caption"
            ghost
            onClick={datatable.addFilter}
          >
            Add filter
          </StyledIconButton>
          {filtered && (
            <ButtonLink
              size="caption"
              palette="primary"
              weight="medium"
              onClick={datatable.clearFilters}
            >
              Clear filters
            </ButtonLink>
          )}
        </Bottom>
      </Wrapper>
    );
  }
}
