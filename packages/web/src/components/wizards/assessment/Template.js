import React  from 'react';
import styled, { css } from 'styled-components';
import { func, string, bool } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size } from 'sly/common/components/themes';
import { Button } from 'sly/common/components/atoms';
import IconButton from 'sly/common/components/molecules/IconButton';

export const Wrapper = styled.section`
  margin: auto;
  display: grid;
  ${ifProp('hasSecondColumn', css`
    grid-gap: ${size('layout.gutter')};
  `)}

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: ${size('layout.col5')} ${ifProp('hasSecondColumn', css`${size('layout.col3')}`)};
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: ${size('layout.col5')} ${ifProp('hasSecondColumn', css`${size('layout.col3')}`)};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: ${size('layout.col6')} ${ifProp('hasSecondColumn', css`${size('layout.col4')}`)};
  }
`;

Wrapper.propTypes = {
  hasSecondColumn: bool,
};

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
