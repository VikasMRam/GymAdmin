import React from 'react';
import { oneOf, number, bool, func } from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import { getKey, palette, size } from 'sly/components/themes';
import { Block, Button } from 'sly/components/atoms';

const Wrapper = styled.div`
  background-color: ${palette('grey', 'stroke')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
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
  width:100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width:auto;
  }
`;

const StyledNumberFormat = styled(NumberFormat)`
  font-weight: 500;
`;

const EstimatedPriceText = styled(Block)`
  margin-right: ${size('spacing.small')}
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: initial;
  }
`;

const PricingFormFooter = ({
  palette: paletteProp, price, isButtonDisabled, isFinalStep,
  onProgressClick,
}) => (
  <Wrapper>
    <PreferenceWrapper>
      <EstimatedPriceText size="caption" variation="accent">
        Your estimated pricing
      </EstimatedPriceText>
      <StyledNumberFormat decimalScale={0} value={price} displayType="text" thousandSeparator prefix="$" />/mo
    </PreferenceWrapper>
    {isFinalStep && <StyledButton kind="jumbo" disabled={isButtonDisabled} palette={paletteProp} onClick={onProgressClick}>Send Pricing Request</StyledButton>}
    {!isFinalStep && <StyledButton kind="jumbo" disabled={isButtonDisabled} palette={paletteProp} onClick={onProgressClick}>Continue</StyledButton>}
  </Wrapper>
);

PricingFormFooter.propTypes = {
  isFinalStep: bool,
  isButtonDisabled: bool,
  price: number.isRequired,
  onProgressClick: func,
  palette: oneOf(Object.keys(getKey('palette'))),
};

PricingFormFooter.defaultProps = {
  palette: 'primary',
};

export default PricingFormFooter;
