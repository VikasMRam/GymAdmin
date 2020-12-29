import React  from 'react';
import styled, { css } from 'styled-components';
import { func, string, bool } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/common/components/themes';
import { Button } from 'sly/common/components/atoms';
import IconButton from 'sly/common/components/molecules/IconButton';

export const PageWrapper = styled.section`
// background-color: ${palette('white', 'background')};    
  background-color: ${palette('harvest', 'background')};  
  padding: ${size('spacing.xxxLarge')} ${size('spacing.xLarge')};
  width: 100%;
  // height: calc(100vh - 60px);
  display: grid;

  ${ifProp('hasTwoButtons', css`
    justify-content: space-between;
    grid-template-columns: min-content min-content;
    grid-template-rows: min-content min-content;
    grid-gap: ${size('spacing.regular')};
  `, css`
  grid-template-columns: 100%;
  grid-gap: ${size('spacing.xLarge')};
  `)}

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
  //   ${ifProp('hasTwoButtons', css`
  //   justify-content: space-between;
  //   grid-template-columns: min-content min-content;
  //   grid-gap: ${size('spacing.regular')};
  // `, css`
  // grid-template-columns: min-content;
  // grid-gap: ${size('spacing.regular')};
  // `)}
  //   grid-template-columns: 40% 20% 40%;
    // justify-content: space-between;
    padding: ${size('spacing.xxxLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    // grid-template-columns: 50% 20% 30%;
    // justify-content: space-between;
    padding: ${size('spacing.xxxLarge')};
  }

`;

PageWrapper.propTypes = {
  hasSecondColumn: bool,
};
// //   Main: 504px
// Tip: 328px
// Tablet
// Main: 504px
// Tip: 504px
// Mobile
// Main: 360px
// Tip: 360px
// Step component wrapper
export const Wrapper = styled.section`
  background-color: ${palette('white', 'background')};    
  border-radius: ${size('border.xxLarge')};
  padding: ${size('spacing.large')};
  height: fit-content;
  width: 360px;
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: 504px;
  }
`;

Wrapper.propTypes = {
  hasSecondColumn: bool,
};

export const ProgressBarWrapper = styled.div`
  width:100%;
`;

export const TipBoxWrapper = styled.div`
  height:fit-content;
  width: 360px;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: 504px;
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: 328px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledIconButton = styled(IconButton)`
  padding-left: 0;
`;

const ProgressButtonsWrapper = styled.div`
  ${ifProp('hasTwoButtons', css`
    display: grid;
    justify-content: space-between;
    grid-template-columns: min-content min-content;
    grid-gap: ${size('spacing.regular')};
  `)}
`;

export const Footer = ({ onBackClick, onSkipClick, submitButtonText, invalid, submitting }) => (
  <ButtonWrapper>
    {onBackClick && <StyledIconButton transparent icon="chevron-left" onClick={onBackClick} palette="primary">Back</StyledIconButton>}
    {!onBackClick && <div />}
    <ProgressButtonsWrapper hasTwoButtons={!!onSkipClick}>
      {onSkipClick && <Button ghost palette="slate" borderPalette="grey" borderVariation="filler" onClick={onSkipClick}>Skip</Button>}
      <Button type="submit" disabled={invalid || submitting}>{submitButtonText}</Button>
    </ProgressButtonsWrapper>
  </ButtonWrapper>
);

Footer.propTypes = {
  onSkipClick: func,
  onBackClick: func,
  submitButtonText: string.isRequired,
  invalid: bool,
  submitting: bool,
};

Footer.defaultProps = {
  submitButtonText: 'Continue',
};
