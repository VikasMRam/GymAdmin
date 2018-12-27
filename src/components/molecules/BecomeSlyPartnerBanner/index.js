import React from 'react';
import styled from 'styled-components';

import { palette as palettePropType } from 'sly/propTypes/palette';
import { Block, Logo } from 'sly/components/atoms';
import { size, palette } from 'sly/components/themes';

const getBackground = ({ type }) => palette(type, 'base');

const Wrapper = styled(Block)`
  background: ${getBackground};
  text-align: center;
  padding: ${size('spacing.xxxLarge')};
`;

const TextWrapper = styled.div`
  border-left: ${size('border.regular')} solid ${palette('white', 'base')};
  padding-left: ${size('spacing.regular')};
  margin-left: ${size('spacing.regular')};
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BecomeSlyPartnerBanner = ({ palette }) => (
  <Wrapper type={palette} palette="white" weight="regular">
    <TopWrapper>
      <Logo variant="white" />
      <TextWrapper>PARTNERS</TextWrapper>
    </TopWrapper>
  </Wrapper>
);

BecomeSlyPartnerBanner.propTypes = {
  palette: palettePropType.isRequired,
};

BecomeSlyPartnerBanner.defaultProps = {
  palette: 'primary',
};

export default BecomeSlyPartnerBanner;
