import React from 'react';
import styled from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import { Block, Button } from 'sly/web/components/atoms';

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
  border-radius: ${size('spacing.small')};
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
      <StyledBlock>There’s no upfront cost to help qualified referrals</StyledBlock>
    </ContentWrapper>
    <Button href="https://airtable.com/shrSPVMmNkNEYEgYx" kind="jumbo">Apply now</Button>
  </Wrapper>
);

export default PartnerWithSly;
