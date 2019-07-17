import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { bool } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import { adminAgentPropType } from 'sly/propTypes/agent';
import { Heading, Badge } from 'sly/components/atoms';
import Block from 'sly/components/atoms/Block';
import Icon from 'sly/components/atoms/Icon';

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

const AgentInfoWrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    column-count: 2;
    column-gap: ${size('spacing.xLarge')};
   }
`;

const IconItem = styled.div`
  display: flex;
`;

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;
const StyledBlock = styled(Block)`
  font-size:${size('text.caption')};
`;

const agentPropsMap = {
  parentCompany: 'menu',
  slyCellPhone: 'phone',
  slyWorkPhone: 'phone',
  lastFiveDayLeadCount: 'loyalty',
};

export default class DashboardAdminAgentTile extends Component {
  static propTypes = {
    agent: adminAgentPropType.isRequired,
    isRecommended: bool.isRequired,
  };

  static defaultProps = {
    isRecommended: false,
  };

  render() {
    const { agent, isRecommended } = this.props;

    return (
      <Fragment>
        <Header>
          <SlyScore>{agent.info.slyScore}</SlyScore>
          <Heading level="subtitle"> { agent.name } </Heading>
          {isRecommended && <StyledBadge textPalette="white">Recommended</StyledBadge> }
        </Header>
        <AgentInfoWrapper>
          {Object.entries(agentPropsMap)
            .map(([key, icon]) => (
              <IconItem>
                <StyledIcon icon={icon} size="caption" />
                <StyledBlock>{agent.info[key]}</StyledBlock>
              </IconItem>
            ))
          }
        </AgentInfoWrapper>
        <IconItem>
          <StyledIcon icon="note" size="caption" />
          <StyledBlock>{agent.info.adminNote}</StyledBlock>
        </IconItem>
      </Fragment>
    );
  }
}
