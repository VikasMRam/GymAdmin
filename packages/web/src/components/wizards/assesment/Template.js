import React  from 'react';
import styled, { css } from 'styled-components';
import { func } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size } from 'sly/web/components/themes';
import { Button } from 'sly/web/components/atoms';
import IconButton from 'sly/web/components/molecules/IconButton';

export const Wrapper = styled.main`
  display: grid;
  grid-gap: ${size('layout.gutter')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: ${size('layout.col5')} ${size('layout.col3')};
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: ${size('layout.col5')} ${size('layout.col3')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: ${size('layout.col6')} ${size('layout.col4')};
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

export const Footer = ({ onBackClick, onSkipClick }) => (
  <ButtonWrapper>
    {onBackClick && <StyledIconButton transparent icon="chevron-left" onClick={onBackClick} foregroundPalette="primary">Back</StyledIconButton>}
    {!onBackClick && <div />}
    <ProgressButtonsWrapper hasTwoButtons={!!onSkipClick}>
      {onSkipClick && <Button ghost palette="slate" borderPalette="grey" borderVariation="filler" onClick={onSkipClick}>Skip</Button>}
      <Button type="submit">Continue</Button>
    </ProgressButtonsWrapper>
  </ButtonWrapper>
);

Footer.propTypes = {
  onSkipClick: func,
  onBackClick: func,
};
