import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { string, bool, object } from 'prop-types';
import { generatePath } from 'react-router';
import { parse } from 'query-string';

import {
  ADMIN_DASHBOARD_AGENTS_PATH,
  ADMIN_DASHBOARD_AGENT_DETAILS_PATH,
  SUMMARY,
  AGENT_DETAILS,
  CONTACTS,
} from 'sly/constants/dashboardAppPaths';
import { PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import { adminAgentPropType } from 'sly/propTypes/agent';
import userPropType from 'sly/propTypes/user';
import { size, palette } from 'sly/components/themes';
import { clickEventHandler } from 'sly/services/helpers/eventHandlers';
import pad from 'sly/components/helpers/pad';
import { userIs } from 'sly/services/helpers/role';
import textAlign from 'sly/components/helpers/textAlign';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardTwoColumnTemplate from 'sly/components/templates/DashboardTwoColumnTemplate';
import { Box, Block, Icon, Link, Hr } from 'sly/components/atoms';
import Tabs from 'sly/components/molecules/Tabs';
import Tab from 'sly/components/molecules/Tab';
import AgentSummary from 'sly/components/molecules/AgentSummary';
import BackLink from 'sly/components/molecules/BackLink';
import PartnerAgentProfileFormContainer from 'sly/containers/PartnerAgentProfileFormContainer';
import DashboardAgentContactsSectionContainer from 'sly/containers/dashboard/DashboardAgentContactsSectionContainer';
import { Datatable } from 'sly/services/datatable';

const LargePaddingWrapper = styled.div`
  padding: ${size('spacing.large')};
`;

const BackLinkWrapper = pad(styled.div`
  display: flex;
  align-items: center;
`, 'regular');

const TextAlignCenterBlock = pad(textAlign(Block, 'center'), 'regular');
const AlignCenterBackLinkWrapper = styled(BackLinkWrapper)`
  justify-content: center;
`;

const SmallScreenBorder = css`
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    border: 0;
  }
`;

const SmallScreenBorderAgentSummary = styled(AgentSummary)`
  ${SmallScreenBorder}
`;

const TabWrapper = styled(Box)`
  padding: ${size('spacing.large')};
  background-color: ${palette('grey', 'background')};
  margin-bottom: ${size('dashboard.actionFooterBottomMargin')};
  border-width: 0;

  > * {
    background-color: ${palette('white', 'base')};
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    background-color: ${palette('white', 'base')};
    padding: 0;
    margin-bottom: 0;
    border-width: ${size('border.regular')};

    > * {
      background-color: transparent;
    }
  }
`;

const MobileTab = styled(Tab)`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const BigScreenSummarySection = styled.section`
  display: none;

  > * {
    background-color: ${palette('white', 'base')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
  }
`;

const SmallScreenAgentNameWrapper = styled.div`
  padding: ${size('spacing.large')};
  background-color: ${palette('white', 'base')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;


const StyledAgentNameBlock = styled(Block)`
  display: flex;
  align-items: center;

  > :nth-child(2) {
    flex-grow: 1;
    text-align: center;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    > :nth-child(2) {
      text-align: left;
    }

    > :nth-child(1) {
      display: none;
    }
  }

`;


const AgentName = ({ agent, backLinkHref }) => {
  const { name } = agent;

  return (
    <StyledAgentNameBlock
      weight="medium"
      size="subtitle"
    >
      <Link to={backLinkHref}>
        <Icon icon="arrow-left" palette="primary" />
      </Link>
      <span>{name}</span>
    </StyledAgentNameBlock>
  );
};

AgentName.propTypes = {
  agent: adminAgentPropType,
  backLinkHref: string,
};

const StyledDashboardTwoColumnTemplate = styled(DashboardTwoColumnTemplate)`
  margin-bottom: ${size('element.xxxLarge')};

  main {
    padding: 0;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-bottom: 0;

    main {
      padding: ${size('spacing.xLarge')};
    }
  }
`;

const PaddedBackLink = pad(BackLink, 'regular');

export default class DashboardAgentDetailPage extends Component {
  static propTypes = {
    agent: adminAgentPropType,
    user: userPropType.isRequired,
    rawAgent: object,
    isLoading: bool,
    currentTab: string,
    location: object,
  };

  getTabPathsForUser = () => {
    const { agent } = this.props;
    const { id } = agent;
    const summaryPath = generatePath(ADMIN_DASHBOARD_AGENT_DETAILS_PATH, { id, tab: SUMMARY });
    const agentDetailsPath = generatePath(ADMIN_DASHBOARD_AGENT_DETAILS_PATH, { id, tab: AGENT_DETAILS });
    const contactsPath = generatePath(ADMIN_DASHBOARD_AGENT_DETAILS_PATH, { id, tab: CONTACTS });

    return {
      summaryPath,
      agentDetailsPath,
      contactsPath,
    };
  };

  getTabsForUser = () => {
    const { user } = this.props;
    const {
      summaryPath,
      agentDetailsPath,
      contactsPath,
    } = this.getTabPathsForUser();

    const summaryTab = (
      <MobileTab id={SUMMARY} key={SUMMARY} to={summaryPath} onClick={clickEventHandler('agentDetails-tab', 'Summary')}>
        Summary
      </MobileTab>
    );

    const genTab = ({ id, to, label }) => {
      return (
        <Tab id={id} key={id} to={to} onClick={clickEventHandler('agentDetails-tab', label)}>
          {label}
        </Tab>
      );
    };
    const adminTabList = [
      { id: AGENT_DETAILS, to: agentDetailsPath, label: 'Agent Details' },
      { id: CONTACTS, to: contactsPath, label: 'Contacts' },
    ];
    let tabs = [summaryTab];
    if (userIs(user, PLATFORM_ADMIN_ROLE)) {
      tabs = tabs.concat(adminTabList.map(e => genTab(e)));
    }
    return tabs;
  };

  render() {
    const { agent, rawAgent, user, currentTab, isLoading: agentIsLoading, location } = this.props;
    if (agentIsLoading) {
      return (
        <StyledDashboardTwoColumnTemplate activeMenuItem="Agents">
          Loading...
        </StyledDashboardTwoColumnTemplate>
      );
    }

    if (!agent) {
      const newUrl = generatePath(ADMIN_DASHBOARD_AGENTS_PATH);
      const backlink = <BackLink linkText="Back to New" to={newUrl} onClick={clickEventHandler('agentDetails', 'Back to Prospects')} />;
      return (
        <DashboardPageTemplate activeMenuItem="Agents">
          <TextAlignCenterBlock weight="medium" size="subtitle">Agent not found!</TextAlignCenterBlock>
          <AlignCenterBackLinkWrapper>{backlink}</AlignCenterBackLinkWrapper>
        </DashboardPageTemplate>
      );
    }

    const backLinkHref = generatePath(ADMIN_DASHBOARD_AGENTS_PATH);
    const backlink = <PaddedBackLink linkText="Back to Agents List" to={backLinkHref} onClick={clickEventHandler('agentDetails', 'Back to Agents List')} />;

    const { id } = agent;

    const agentName = (
      <AgentName
        agent={agent}
        backLinkHref={backLinkHref}
      />
    );

    const { 'page-number': pageNumber, ...filters } = parse(location.search);
    const sectionFilters = {
      'page-number': pageNumber,
      include: 'entities',
    };

    return (
      <StyledDashboardTwoColumnTemplate activeMenuItem="Agents">
        <div> {/* DashboardTwoColumnTemplate should have only 2 children as this is a two column template */}
          <BigScreenSummarySection>
            <Box snap="bottom">
              {backlink}
              {agentName}
            </Box>
            <Hr noMargin />
            <LargePaddingWrapper>
              <AgentSummary agent={agent} showAskQuestionButton={false} />
            </LargePaddingWrapper>
          </BigScreenSummarySection>
          <SmallScreenAgentNameWrapper>
            {agentName}
          </SmallScreenAgentNameWrapper>
        </div>
        <div>
          <Tabs activeTab={currentTab}>
            {this.getTabsForUser()}
          </Tabs>

          <TabWrapper snap="top">
            {currentTab === SUMMARY && (
              <LargePaddingWrapper>
                <SmallScreenBorderAgentSummary agent={agent} showAskQuestionButton={false} />
              </LargePaddingWrapper>
            )}

            {currentTab === AGENT_DETAILS && (
              <LargePaddingWrapper>
                <PartnerAgentProfileFormContainer title={agentName} user={user} agent={agent} rawAgent={rawAgent} isLoading={agentIsLoading} />
              </LargePaddingWrapper>
            )}

            {currentTab === CONTACTS && (
              <LargePaddingWrapper>
                <Datatable
                  id="contacts"
                  sectionFilters={sectionFilters}
                  filters={filters}
                >
                  {datatable => (
                    <DashboardAgentContactsSectionContainer datatable={datatable} agentId={id} />
                  )}
                </Datatable>
              </LargePaddingWrapper>
            )}
          </TabWrapper>
        </div>
      </StyledDashboardTwoColumnTemplate>
    );
  }
}
