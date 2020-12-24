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
  // padding: ${size('spacing.xxxLarge')};
  width: 100%;
  > * {
    margin: auto;
  }
  // margin: auto;
  display: flex;
  flex-direction: row;  
  justify-content:${ifProp('hasSecondColumn', 'space-around', 'center')};
  align-items:${ifProp('hasSecondColumn', 'flex-start', 'center')};
  // ${ifProp('hasSecondColumn', css`
  //   justify-content:space-around;   
  // `)}

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    // grid-auto-flow: column;
    // ${ifProp('hasSecondColumn', css`
    //   grid-template-columns: auto auto;
    // `)}
  }

  // @media screen and (min-width: ${size('breakpoint.laptop')}) {
  //   grid-template-columns: ${size('layout.col6')} ${ifProp('hasSecondColumn', css`${size('layout.col4')}`)};
  // }
`;

PageWrapper.propTypes = {
  hasSecondColumn: bool,
};

// Step component wrapper
export const Wrapper = styled.section`
background-color: ${palette('white', 'background')};    

  margin: auto;
  // display: grid;
  // ${ifProp('hasSecondColumn', css`
  //   grid-gap: ${size('layout.gutter')};
  // `)}

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    max-width: 50%;
    // grid-template-columns: ${size('layout.col5')} ${ifProp('hasSecondColumn', css`${size('layout.col3')}`)};
  }

  // @media screen and (min-width: ${size('breakpoint.laptop')}) {
  //   grid-template-columns: ${size('layout.col6')} ${ifProp('hasSecondColumn', css`${size('layout.col4')}`)};
  // }
`;

Wrapper.propTypes = {
  hasSecondColumn: bool,
};

export const ProgressBarWrapper = styled.div`
  width:100%;
`;

export const TipBoxWrapper = styled.div`
  height:fit-content;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    max-width: 50%;
    // grid-template-columns: ${size('layout.col5')} ${ifProp('hasSecondColumn', css`${size('layout.col3')}`)};
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
