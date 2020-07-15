import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import { size, palette } from 'sly/web/components/themes';
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


const PartnerWithSlyCommunities = ({ onRegisterClick }) => (
  <Wrapper>
    <ContentWrapper>
      <TitleBlock size="hero">Partner with Seniorly, Build Your Census</TitleBlock>
      <StyledBlock>Introducing an online lead partner you can get behind</StyledBlock>
    </ContentWrapper>
    <Button onClick={onRegisterClick} kind="jumbo">Create Account</Button>
  </Wrapper>
);


PartnerWithSlyCommunities.propTypes = {
  onRegisterClick: func,
};

export default PartnerWithSlyCommunities;
