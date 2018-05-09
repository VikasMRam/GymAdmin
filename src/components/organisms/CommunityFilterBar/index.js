import React from 'react';
import styled from 'styled-components';
import { object, func } from 'prop-types';

import { size } from 'sly/components/themes';

import IconButton from 'sly/components/molecules/IconButton';
import Button from 'sly/components/atoms/Button';

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 100%;
`;
export const StyledIButton = styled(IconButton)`
  display: flex;
  flex-direction: row;
  margin: ${size('spacing.large')};
  width: 100%;
  padding: ${size('spacing.large')};
`;
export const StyledButton = styled(Button)`
  display: flex;
  flex-direction: row;
  margin: auto;
  width: 100%;
  padding: ${size('spacing.large')};
`;

const getEvtHandler = (paramsToRemove, origFn) => {
  return (uiEvt) => {
    origFn({ origUiEvt: uiEvt, paramsToRemove });
  };
};

const CommunityFilterBar = ({ searchParams, onParamsRemove }) => {
  const { size, budget } = searchParams;

  const filtersApplied = [];
  if (size) filtersApplied.push('size');
  if (budget) filtersApplied.push('budget');

  return (
    <SectionWrapper>
      {size && (
        <StyledIButton
          right
          icon="close"
          onClick={getEvtHandler(['size'], onParamsRemove)}
        >
          Size
        </StyledIButton>
      )}
      {budget && (
        <StyledIButton
          right
          icon="close"
          onClick={getEvtHandler(['budget'], onParamsRemove)}
        >
          Budget
        </StyledIButton>
      )}
      {filtersApplied.length > 0 && (
        <StyledButton
          onClick={getEvtHandler(filtersApplied, onParamsRemove)}
          transparent
        >
          Clear All Filters
        </StyledButton>
      )}
    </SectionWrapper>
  );
};

CommunityFilterBar.propTypes = {
  searchParams: object.isRequired,
  onParamsRemove: func.isRequired,
};

export default CommunityFilterBar;
