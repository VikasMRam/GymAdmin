import React from 'react';
import styled from 'styled-components';

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
  height: 420px;
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

const BecomeSlyPartnerBanner = ({ palette }) => (
  <Wrapper type={palette} palette="white">
    <TopWrapper>
      <Logo palette="white" />
      <Line />
      <div>PARTNERS</div>
    </TopWrapper>
    <StyledBlock palette="white" size="title">Become A Seniorly Partner Agent</StyledBlock>
    <Button href="https://docs.google.com/forms/d/1wMTmjC8RdS0lGYSBppTRYBBhJ0yd-P6SsTLtOinqMsA/viewform" kind="jumbo" palette="white" foregroundPalette="primary">Apply now</Button>
  </Wrapper>
);

BecomeSlyPartnerBanner.propTypes = {
  palette: palettePropType.isRequired,
};

BecomeSlyPartnerBanner.defaultProps = {
  palette: 'primary',
};

export default BecomeSlyPartnerBanner;
