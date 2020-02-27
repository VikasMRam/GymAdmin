import React from 'react';
import styled from 'styled-components';
import { object, func } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import IconButton from 'sly/components/molecules/IconButton';
import Button from 'sly/components/atoms/Button';
import { budgets, sizes, getFiltersApplied, tocs } from 'sly/services/helpers/search';
import withGenerateFilterLinkPath from 'sly/services/search/withGenerateFilterLinkPath';

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
  color: ${palette('primary', 'base')};
`;

const CommunityFilterBar = ({ searchParams, generateFilterLinkPath }) => {
  const { toc, size, budget } = searchParams;
  const matchingBudget = budget ? budgets.find(object => object.value === budget) : null;
  const budgetLabel = matchingBudget ? matchingBudget.label : null;
  const matchingSize = size ? sizes.find(object => object.value === size) : null;
  const sizeLabel = matchingSize ? matchingSize.label : null;
  const actualToc = tocs.find(elem => (elem.value === toc));
  const filtersApplied = getFiltersApplied(searchParams);
  const tocApplied = (toc && toc !== 'nursing-homes');
  return (
    <SectionWrapper hasFilters={tocApplied || size || budget}>
      {tocApplied && (
        <FilterButton
          right
          icon="close"
          iconSize="small"
          palette="slate"
          ghost
          transparent
          to={generateFilterLinkPath({ paramsToRemove: ['toc'] })}
        >
          {actualToc.label}
        </FilterButton>
      )}
      {size && (
        <FilterButton
          right
          icon="close"
          iconSize="small"
          palette="slate"
          ghost
          transparent
          to={generateFilterLinkPath({ paramsToRemove: ['size'] })}
        >
          {sizeLabel}
        </FilterButton>
      )}
      {budget && (
        <FilterButton
          right
          icon="close"
          iconSize="small"
          palette="slate"
          ghost
          transparent
          to={generateFilterLinkPath({ paramsToRemove: ['budget'] })}
        >
          {budgetLabel}
        </FilterButton>
      )}
      {filtersApplied.length > 0 && (
        <ClearAllButton
          to={generateFilterLinkPath({ paramsToRemove: filtersApplied })}
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
  generateFilterLinkPath: func.isRequired,
};

export default withGenerateFilterLinkPath(CommunityFilterBar);
