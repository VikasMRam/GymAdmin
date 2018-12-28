import React from 'react';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { Block, Button } from 'sly/components/atoms';

const TitleBlock = styled(Block)`
  margin: auto;
  margin-bottom: ${size('spacing.regular')};
  max-width: ${size('layout.col5')};
`;

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const Wrapper = styled.div`
  background: ${palette('white', 'base')}E6;
  border-radius: ${size('border.xLarge')};
  text-align: center;
  padding: ${size('spacing.xxxLarge')};
  width: 100%;
`;

const ContentWrapper = styled.div`
  margin: auto;
  text-align: center;
`;

const PartnerWithSly = () => (
  <Wrapper>
    <ContentWrapper>
      <TitleBlock size="hero">Partner with Seniorly, Expand Your Agency</TitleBlock>
      <StyledBlock>There’s no upfront cost to help high-quality referrals</StyledBlock>
    </ContentWrapper>
    <Button href="/providers/crm" kind="jumbo">Apply now</Button>
  </Wrapper>
);

export default PartnerWithSly;
