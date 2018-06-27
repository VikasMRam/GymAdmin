import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { community as communityPropType } from 'sly/propTypes/community';
import { getCitySearchUrl } from 'sly/services/helpers/url';

import { Button, Block, Icon, Heading } from 'sly/components/atoms';
import AgentTile from "sly/components/molecules/AgentTile";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: ${size('spacing.large')};
  width: 100%;
`;

const StyledIcon = styled(Icon)`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledHeading = styled(Heading)`
  text-align:center;
  margin-bottom: ${size('spacing.large')};
`;

const StyledBlock = styled(Block)`
  margin: 0 ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};
`;


const CalendlyConcierge = ({ launchCalendly }) => (
  <Wrapper>
    <StyledIcon icon="logo" size="xLarge" />
    <StyledHeading>Book an appointment!</StyledHeading>
    <StyledBlock>
      Let us help you tour
      this community.
    </StyledBlock>
    <StyledBlock>
      This is a free service.
    </StyledBlock>
    <Button onClick={launchCalendly} kind="jumbo">
      Book Now
    </Button>
  </Wrapper>
);

CalendlyConcierge.propTypes = {
  onClose: func,
};

export default CalendlyConcierge;

