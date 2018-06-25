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
  width: 100%;
`;

const StyledIcon = styled(Icon)`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const StyledBlock = styled(Block)`
  margin: 0 ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};
`;


const CalendlyConcierge = ({ launchCalendly }) => (
  <Wrapper>
    <StyledIcon icon="logo" size="xLarge" />
    <StyledHeading>Get an appointment now!</StyledHeading>
    <StyledBlock>
      If there's something strange in you neighborhood 
    </StyledBlock>
    <StyledBlock>
      Who you gonna call?
    </StyledBlock>
    <Button onClick={launchCalendly} kind="jumbo">
      Book an Appointment
    </Button>
  </Wrapper>
);

CalendlyConcierge.propTypes = {
  onClose: func,
};

export default CalendlyConcierge;

