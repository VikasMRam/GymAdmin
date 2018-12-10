import React from 'react';
import { bool, func } from 'prop-types';
import styled from 'styled-components';

import { palette as palettePropType } from 'sly/propTypes/palette';
import { palette, size } from 'sly/components/themes';
import { Button } from 'sly/components/atoms';

const Wrapper = styled.div`
  background-color: ${palette('grey', 'stroke')};
  display: flex;
  
  padding: ${size('spacing.large')} ${size('spacing.xLarge')};
  border-top: ${size('border.regular')} solid ${palette('slate', 'stroke')};
`;

const PreferenceWrapper = styled.div`
  display: inline-flex;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: block;
  }
`;
PreferenceWrapper.displayName = 'PreferenceWrapper';

const StyledButton = styled(Button)`
  margin: 0 auto;
  width: ${size('mobileLayout.col4')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col6')};
  }
`;

const PricingFormFooter = ({
  palette: paletteProp, isButtonDisabled, isFinalStep,
  onProgressClick,
}) => (
  <Wrapper>
    <StyledButton kind="jumbo" disabled={isButtonDisabled} palette={paletteProp} onClick={onProgressClick}>{isFinalStep ? 'Send Pricing Request' : 'Continue'}</StyledButton>
  </Wrapper>
);

PricingFormFooter.propTypes = {
  isFinalStep: bool,
  isButtonDisabled: bool,
  onProgressClick: func,
  palette: palettePropType,
};

export default PricingFormFooter;
