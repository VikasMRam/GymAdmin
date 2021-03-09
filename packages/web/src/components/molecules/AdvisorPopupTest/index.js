import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import agentPropType from 'sly/common/propTypes/agent';
import { size } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import { getImagePath } from 'sly/web/services/images';
import { phoneFormatter } from 'sly/web/services/helpers/phone';
import { Block, Button, Image, Link } from 'sly/web/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import SlyEvent from 'sly/web/services/helpers/events';

const SubHeading = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const items = [
  { icon: 'favourite-light', text: '100% free. They do not charge you.' },
  { icon: 'location', text: 'Personalized service. They set up tours and can accompany you.' },
  { icon: 'book', text: 'Expert knowledge. They can answer any question you have.' },
  { icon: 'house', text: 'Insider information. They know unique details about this community.' },
];

const List = styled.ul`
  padding: 0 0 ${size('spacing.xLarge')};
`;

const ListItem = styled.li`
  list-style: none;
  margin: 0 0 ${size('spacing.large')};
`;

const GotItButton = styled(Button)`
  width: 100%;
`;

const phoneClickEvt = (agent) => {
  return () => {
    SlyEvent.getInstance().sendEvent({
      category: 'profileAdvisorPopupPhone',
      action: 'click',
      label: agent.id,
    });
  };
};
const apptClickEvt = (agent) => {
  return () => {
    SlyEvent.getInstance().sendEvent({
      category: 'profileAdvisorPopupAppointment',
      action: 'click',
      label: agent.id,
    });
  };
};

const AdvisorPopupTest = ({ onButtonClick, agent }) => {
  const {
    info,
  } = agent;
  const { displayName, cellPhone, appointmentLink } = info;
  return (
    <div>
      <Block marginBottom="large">
        <Block marginBottom="large">
          <Link href={`tel:${cellPhone}`} onClick={phoneClickEvt(agent)} >Click to call {displayName} at {phoneFormatter(cellPhone)} now</Link>
        </Block>
        <Block marginBottom="large">
          <Link href={appointmentLink} onClick={apptClickEvt(agent)} > Click to schedule a call for {displayName} </Link>
        </Block>
      </Block>
      <GotItButton kind="jumbo" onClick={onButtonClick}>Back to Community</GotItButton>
    </div>
  );
};

AdvisorPopupTest.propTypes = {
  onButtonClick: func,
  agent: agentPropType,
};

export default AdvisorPopupTest;
