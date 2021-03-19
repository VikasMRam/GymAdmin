import React, { Component } from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';

import { size } from 'sly/common/components/themes';
import { Button } from 'sly/common/components/atoms';
import { clickEventHandler } from 'sly/web/services/helpers/eventHandlers';

const StyledButton = styled(Button)`
  width: 100%;
`;

export default class AgentAppointmentContainer extends Component {
  static typeHydrationId = 'AgentAppointmentContainer';

  static propTypes = {
    community: object.isRequired,
    agent: object.isRequired,
  };

  render() {
    const { agent, community } = this.props;
    let agentCtaLink = 'https://www.seniorly.com';
    if (agent && agent.info) {
      // agentCtaLink = `tel:${partnerAgent.info.cellPhone}`;
      agentCtaLink = `${agent.info.appointmentLink}`;
    }
    return <StyledButton to={agentCtaLink} onClick={clickEventHandler(`agent-${agent.id}`, community.id)} target="_blank">Schedule a Call Now</StyledButton>;
  }
}
