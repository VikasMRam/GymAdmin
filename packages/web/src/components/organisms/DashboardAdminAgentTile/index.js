import React, { Component } from 'react';
import styled from 'styled-components';
import { bool, func } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/common/components/themes';
import { adminAgentPropType } from 'sly/common/propTypes/agent';
import { Heading, Badge, Button, Span } from 'sly/web/components/atoms';

const Header = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin-right: ${size('spacing.regular')};
  }
`;

const SlyScore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${palette('grey', 'filler')};
  border-radius: ${size('spacing.small')};
  font-weight: ${size('weight.bold')};
  height: ${size('element.regular')};
  width: ${size('element.regular')};
  margin-right: ${size('spacing.large')};
`;

const StyledBadge = styled(Badge)`
  text-transform: uppercase;
`;

const lineHeight = p => size('lineHeight', p.size);
const textSize = p => size('text', p.size);

const AgentInfoWrapper = styled.div`
  padding: ${size('spacing.regular')};
  padding-bottom: ${ifProp('isFloatingSectionPresent', 0)};
  display: grid;
  grid-template-columns: max-content auto;
  grid-column-gap: ${size('spacing.large')};
  grid-row-gap: ${size('spacing.regular')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-left: auto;
    padding: ${size('spacing.regular')};
  }
`;

const agentPropsMap = {
  parentCompany: 'Parent Company',
  cellPhone: 'Cell Phone',
  workPhone: 'Work Phone',
  last24hrLeadCount: 'Past 1 Day Count',
};

export default class DashboardAdminAgentTile extends Component {
  static propTypes = {
    notifyError: func.isRequired,
    notifyInfo: func.isRequired,
    agent: adminAgentPropType.isRequired,
    isRecommended: bool.isRequired,
  };

  static defaultProps = {
    isRecommended: false,
  };

  copyToClipboard = () => {
    const { agent } = this.props;
    const { cellPhone } = agent.info;
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(cellPhone)
        .then(() => alert(`Phone number ${cellPhone} copied to clipboard!`))
        .catch(() => alert(`Could not copy ${cellPhone} to clipboard!`));
    } else {
      alert(`Copy ${cellPhone} to clipboard unsupported!`);
    }
  };

  render() {
    const { agent, isRecommended } = this.props;
    const infoRowsNumber = Math.ceil(Object.keys(agentPropsMap).length / 2);
    return (
      <>
        <Header>
          <SlyScore>{agent.info.slyScore}</SlyScore>
          <Heading level="subtitle"> { agent.name } </Heading>
          {isRecommended && <StyledBadge palette="white">Recommended</StyledBadge> }
        </Header>
        <AgentInfoWrapper size="caption" rows={infoRowsNumber}>
          {Object.entries(agentPropsMap)
            .map(([key, item]) => (
              <>
                <Span size="caption" palette="grey" variation="dark">{item}</Span>
                <Span size="caption">{agent.info[key]}</Span>
              </>
            ))
          }
          <>
            <Span palette="grey" size="caption" variation="dark">Admin Notes</Span>
            <Span size="caption">{agent.info.adminNotes}</Span>
          </>
        </AgentInfoWrapper>

        <Button onClick={this.copyToClipboard}>WT: {agent.info.cellPhone}</Button>
      </>
    );
  }
}
