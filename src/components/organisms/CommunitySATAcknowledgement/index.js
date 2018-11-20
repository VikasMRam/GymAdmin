import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import Heading from 'sly/components/atoms/Heading/index';
import { Block, Button } from 'sly/components/atoms/index';
import Icon from 'sly/components/atoms/Icon/index';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-left: auto;
    margin-right: auto;
    width: calc(${size('layout.col5')} + ${size('layout.gutter')});
  }
`;

const HeadingSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${size('spacing.large')};
`;

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const StyledHeading = styled(Heading)`
  text-align: center;
`;

const StyledBlock = styled(Block)`
  text-align: center;
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledButton = styled(Button)`
  margin-left: auto;
  margin-right: auto;
`;

const CommunitySATAcknowledgement = ({ onButtonClick }) => (
  <Wrapper>
    <HeadingSection>
      <StyledIcon icon="circle-tick" size="large" />
      <StyledHeading>Tour Request Sent!</StyledHeading>
    </HeadingSection>
    <StyledBlock>Your advisor will check if this community is available at this time. They will get back to you shortly by phone or email.</StyledBlock>
    <StyledButton kind="jumbo" palette="primary" onClick={onButtonClick} >View Similar Communities</StyledButton>
  </Wrapper>
);

CommunitySATAcknowledgement.propTypes = {
  onButtonClick: func.isRequired,
};

export default CommunitySATAcknowledgement;
