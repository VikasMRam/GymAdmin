import React from 'react';
import styled from 'styled-components';
import { object, func } from 'prop-types';

import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';

import IconButton from 'sly/components/molecules/IconButton';
import Button from 'sly/components/atoms/Button';

import { budgets, sizes, getFiltersApplied, getEvtHandler } from 'sly/services/helpers/search';

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${ifProp('hasFilters', size('spacing.xLarge'), size('spacing.regular'))};
`;

export const FilterButton = styled(IconButton)`
  display: flex;
  flex-direction: row;
  margin-right: ${size('spacing.regular')};
`;

export const ClearAllButton = styled(Button)`
  display: flex;
  flex-direction: row;
  color: ${palette('primary', 0)};
`;

const CommunityFilterBar = ({ searchParams, onParamsRemove }) => {
  const { size, budget } = searchParams;
  const matchingBudget = budget ? budgets.find(object => object.value === budget) : null;
  const budgetLabel = matchingBudget ? matchingBudget.label : null;
  const matchingSize = size ? sizes.find(object => object.value === size) : null;
  const sizeLabel = matchingSize ? matchingSize.label : null;

  const filtersApplied = getFiltersApplied(searchParams);

  return (
    <SectionWrapper hasFilters={size || budget}>
      {size && (
        <FilterButton
          right
          icon="close"
          iconSize="small"
          palette="grayscale"
          ghost
          transparent
          onClick={getEvtHandler(['size'], onParamsRemove)}
        >
          {sizeLabel}
        </FilterButton>
      )}
      {budget && (
        <FilterButton
          right
          icon="close"
          iconSize="small"
          palette="grayscale"
          ghost
          transparent
          onClick={getEvtHandler(['budget'], onParamsRemove)}
        >
          {budgetLabel}
        </FilterButton>
      )}
      {filtersApplied.length > 0 && (
        <ClearAllButton
          onClick={getEvtHandler(filtersApplied, onParamsRemove)}
          transparent
        >
          Clear all filters
        </ClearAllButton>
      )}
    </SectionWrapper>
  );
};

CommunityFilterBar.propTypes = {
  searchParams: object.isRequired,
  onParamsRemove: func.isRequired,
};

export default CommunityFilterBar;
