import React from 'react';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { Icon, Block } from 'sly/components/atoms/index';

const Wrapper = styled.div`
  width: ${size('layout.col4')};
  padding: ${size('spacing.large')};
  display: flex;
  background-color: ${palette('primary', 'stroke')};
`;

const LoyaltyIcon = styled(Icon)`
  margin-right: ${size('spacing.large')};
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeading = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const CommunityAgentCashback = () => (
  <Wrapper>
    <LoyaltyIcon icon="baseline-loyalty" size="large" />
    <TextSection>
      <StyledHeading size="body">Get up to $500 cash back*</StyledHeading>
      <Block size="caption" weight="medium">Enjoy cash back when you move in with help from a Seniorly Agent.</Block>
    </TextSection>
  </Wrapper>
);

export default CommunityAgentCashback;
