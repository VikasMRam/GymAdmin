import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import agentPropType from 'sly/common/propTypes/agent';
// import { size } from 'sly/common/components/themes';
import { phoneFormatter } from 'sly/web/services/helpers/phone';
import { Block, Button, Link } from 'sly/web/components/atoms';
import SlyEvent from 'sly/web/services/helpers/events';

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
        {/* {appointmentLink && appointmentLink !== ''
          && */}
        <Block marginBottom="large">
          <Link href={appointmentLink} onClick={apptClickEvt(agent)} > Click to schedule a call for {displayName} </Link>
        </Block>
        {/* } */}
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
