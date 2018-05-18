import React from 'react';
import styled from 'styled-components';
import { object, func } from 'prop-types';
import { palette } from 'styled-theme';
import { startCase } from 'lodash';

import { size } from 'sly/components/themes';

import IconButton from 'sly/components/molecules/IconButton';
import Button from 'sly/components/atoms/Button';

import { getFiltersApplied, getEvtHandler } from 'sly/services/helpers/search';

const SectionWrapper = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    display: flex;
    flex-direction: row;
    margin-bottom: ${size('spacing.large')};
  }
`;

export const FilterButton = styled(IconButton)`
  display: flex;
  flex-direction: row;
  margin-right: ${size('spacing.regular')};
  margin-bottom: ${size('spacing.large')};
`;

export const ClearAllButton = styled(Button)`
  display: flex;
  flex-direction: row;
  color: ${palette('primary', 0)};
`;

const CommunityFilterBar = ({ searchParams, onParamsRemove }) => {
  const { size, budget } = searchParams;

  const filtersApplied = getFiltersApplied(searchParams);

  return (
    <SectionWrapper>
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
          Size: {startCase(size)}
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
          Budget: Up to ${budget}
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
