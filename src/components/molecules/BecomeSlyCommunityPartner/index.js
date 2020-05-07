import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import { palette as palettePropType } from 'sly/propTypes/palette';
import { Block, Logo, Button } from 'sly/components/atoms';
import { size, palette } from 'sly/components/themes';

const getBackground = ({ type }) => palette(type, 'base');

const Wrapper = styled(Block)`
  background: ${getBackground};
  text-align: center;
  padding: ${size('spacing.xxxLarge')};
`;

const Line = styled.div`
  background: ${palette('white', 'base')};
  width: ${size('border.regular')};
  height: 100%;
  margin-left: ${size('spacing.regular')};
  margin-right: ${size('spacing.regular')};
`;

const TopWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: min-content min-content min-content;
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledButton = styled(Button)`
  color: ${palette('primary', 'base')};
`;

const BecomeSlyCommunityPartner = ({ palette, onRegisterClick }) => (
  <Wrapper type={palette} palette="white">
    <TopWrapper>
      <Logo palette="white" />
      <Line />
      <div>PARTNERS</div>
    </TopWrapper>
    <StyledBlock palette="white" size="title">Become A Seniorly Partner Community</StyledBlock>
    <StyledButton onClick={onRegisterClick} kind="jumbo" palette="white">Create Account</StyledButton>
  </Wrapper>
);

BecomeSlyCommunityPartner.propTypes = {
  palette: palettePropType.isRequired,
  onRegisterClick: func,
};

BecomeSlyCommunityPartner.defaultProps = {
  palette: 'primary',
};

export default BecomeSlyCommunityPartner;
