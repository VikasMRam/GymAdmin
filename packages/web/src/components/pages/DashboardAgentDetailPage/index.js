import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { string, bool, object, arrayOf, func } from 'prop-types';
import { generatePath } from 'react-router';

import {
  ADMIN_DASHBOARD_AGENTS_PATH,
  ADMIN_DASHBOARD_AGENT_DETAILS_PATH,
  SUMMARY,
  AGENT_DETAILS,
  CONTACTS,
  ACTIVITY,
  MESSAGES,
} from 'sly/web/constants/dashboardAppPaths';
import { PLATFORM_ADMIN_ROLE } from 'sly/web/constants/roles';
import { adminAgentPropType } from 'sly/web/propTypes/agent';
import userPropType from 'sly/web/propTypes/user';
import notePropType from 'sly/web/propTypes/note';
import { size, palette } from 'sly/web/components/themes';
import { clickEventHandler } from 'sly/web/services/helpers/eventHandlers';
import pad from 'sly/web/components/helpers/pad';
import { userIs } from 'sly/web/services/helpers/role';
import textAlign from 'sly/web/components/helpers/textAlign';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import DashboardTwoColumnTemplate from 'sly/web/components/templates/DashboardTwoColumnTemplate';
import { Box, Block, Icon, Link, Hr, Button } from 'sly/web/components/atoms';
import Tabs from 'sly/web/components/molecules/Tabs';
import Tab from 'sly/web/components/molecules/Tab';
import AgentSummary from 'sly/web/components/molecules/AgentSummary';
import BackLink from 'sly/web/components/molecules/BackLink';
import PartnerAgentProfileFormContainer from 'sly/web/containers/PartnerAgentProfileFormContainer';
import DashboardContactsSectionContainer from 'sly/web/containers/dashboard/DashboardContactsSectionContainer';
import DashboardMyFamilyStickyFooterContainer from 'sly/web/containers/DashboardMyFamilyStickyFooterContainer';
import DashboardMessagesContainer from 'sly/web/containers/DashboardMessagesContainer';
import ConversationMessagesContainer from 'sly/web/containers/ConversationMessagesContainer';
import AddNoteFormContainer from 'sly/web/containers/AddNoteFormContainer';
import { AGENT_ENTITY_TYPE } from 'sly/web/constants/entityTypes';
import FamilyActivityItem from 'sly/web/components/molecules/FamilyActivityItem';
import { NOTE_CTYPE_NOTE } from 'sly/web/constants/notes';
import withModal from 'sly/web/controllers/withModal';
import withNotification from 'sly/web/controllers/withNotification';
import SlyEvent from 'sly/web/services/helpers/events';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import conversationPropType from 'sly/web/propTypes/conversation/conversation';

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

const StyledFamilyActivityItem = styled(FamilyActivityItem)`
  border-right: 0;
  border-left: 0;
  &:first-child {
    border-top: 0;
  }
  &:last-child {
    border-bottom: 0;
  }
`;

const SmallScreenBorderDiv = styled.div`
  ${SmallScreenBorder}
  ${p => p.padding && css`padding: ${size('spacing', p.padding)};`}
`;

const FullWidthButton = fullWidth(Button);

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

const DashboardMessagesContainerWrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding: ${size('spacing.xLarge')};
  }
`;

@withModal
@withNotification
export default class DashboardAgentDetailPage extends Component {
  static propTypes = {
    agent: adminAgentPropType,
    user: userPropType.isRequired,
    notes: arrayOf(notePropType),
    rawAgent: object,
    isLoading: bool,
    currentTab: string,
    onAddNote: func.isRequired,
    onEditNote: func.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    selectedConversation: conversationPropType,
    setSelectedConversation: func.isRequired,
  };

  getTabPathsForUser = () => {
    const { agent } = this.props;
    const { id } = agent;
    const summaryPath = generatePath(ADMIN_DASHBOARD_AGENT_DETAILS_PATH, { id, tab: SUMMARY });
    const activitesPath = generatePath(ADMIN_DASHBOARD_AGENT_DETAILS_PATH, { id, tab: ACTIVITY });
    const agentDetailsPath = generatePath(ADMIN_DASHBOARD_AGENT_DETAILS_PATH, { id, tab: AGENT_DETAILS });
    const contactsPath = generatePath(ADMIN_DASHBOARD_AGENT_DETAILS_PATH, { id, tab: CONTACTS });
    const messagesPath = generatePath(ADMIN_DASHBOARD_AGENT_DETAILS_PATH, { id, tab: MESSAGES });

    return {
      summaryPath,
      activitesPath,
      agentDetailsPath,
      contactsPath,
      messagesPath,
    };
  };

  getTabsForUser = () => {
    const { user } = this.props;
    const {
      summaryPath,
      activitesPath,
      agentDetailsPath,
      contactsPath,
      messagesPath,
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
      { id: ACTIVITY, to: activitesPath, label: 'Activities' },
      { id: AGENT_DETAILS, to: agentDetailsPath, label: 'Agent Details' },
      { id: CONTACTS, to: contactsPath, label: 'Contacts' },
      { id: MESSAGES, to: messagesPath, label: 'Messages' },
    ];
    let tabs = [summaryTab];
    if (userIs(user, PLATFORM_ADMIN_ROLE)) {
      tabs = tabs.concat(adminTabList.map(e => genTab(e)));
    }
    return tabs;
  };

  handleAddNoteClick = () => {
    const {
      showModal, agent, hideModal, onAddNote, notifyError, notifyInfo,
    } = this.props;
    const { name } = agent;
    SlyEvent.getInstance().sendEvent({
      category: 'agentDetails',
      action: 'launch',
      label: 'add-note',
      value: '',
    });
    const handleSubmit = data => onAddNote(data, notifyError, notifyInfo, hideModal);

    showModal(<AddNoteFormContainer
      hasCancel
      noteRequired
      onCancelClick={hideModal}
      heading={`Add a note on ${name}`}
      label="Note"
      placeholder=""
      submitButtonText="Save note"
      onSubmit={handleSubmit}
    />, null, 'noPadding', false);
  };

  handleEditNoteClick = (note) => {
    const {
      showModal, agent, hideModal, onEditNote, notifyError, notifyInfo,
    } = this.props;
    const { name } = agent;
    SlyEvent.getInstance().sendEvent({
      category: 'agentDetails',
      action: 'launch',
      label: 'edit-note',
      value: note.id,
    });
    const handleSubmit = data => onEditNote(data, note, notifyError, notifyInfo, hideModal);
    const initialValues = {
      note: note.body,
    };

    showModal(<AddNoteFormContainer
      hasCancel
      noteRequired
      onCancelClick={hideModal}
      heading={`Edit note on ${name}`}
      label="Note"
      placeholder="Edit a note."
      submitButtonText="Save note"
      onSubmit={handleSubmit}
      initialValues={initialValues}
    />, null, 'noPadding', false);
  };

  render() {
    const { agent, rawAgent, user, notes, currentTab, isLoading: agentIsLoading, selectedConversation, setSelectedConversation } = this.props;
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

    const { id, name } = agent;
    const { id: userId } = user;

    const agentName = (
      <AgentName
        agent={agent}
        backLinkHref={backLinkHref}
      />
    );

    const contactsSectionFilters = {
      include: 'entities',
      'filter[agent-id]': id,
    };

    const activityCards = notes ? notes.map((a, i) => {
      const props = {
        key: a.id,
        noBorderRadius: true,
        snap: i === notes.length - 1 ? null : 'bottom',
        title: a.title,
        description: a.body,
        date: a.createdAt,
        cType: a.cType,
      };

      if (a.cType === NOTE_CTYPE_NOTE) {
        props.onEditClick = () => this.handleEditNoteClick(a);
      }

      return <StyledFamilyActivityItem {...props} />;
    }) : [];

    const stickyFooterOptions = [
      {
        text: 'Add note', icon: 'add-note', iconPalette: 'slate', onClick: this.handleAddNoteClick, ghost: true,
      },
    ];
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
            <Box snap="bottom">
              <FullWidthButton onClick={this.handleAddNoteClick} ghost>Add note</FullWidthButton>
            </Box>
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
            {currentTab === ACTIVITY && (
              <SmallScreenBorderDiv padding={!agentIsLoading && activityCards.length > 0 ? null : 'xLarge'}>
                {agentIsLoading && <Block size="subtitle">Loading...</Block>}
                {!agentIsLoading && activityCards.length === 0 &&
                <TextAlignCenterBlock>There are no activities.</TextAlignCenterBlock>
                }
                {!agentIsLoading && activityCards.length > 0 &&
                <>
                  {/* <TableHeaderButtons hasColumnsButton={false} /> */}
                  {activityCards}
                </>
                }
              </SmallScreenBorderDiv>
            )}
            {currentTab === AGENT_DETAILS && (
              <LargePaddingWrapper>
                <PartnerAgentProfileFormContainer title={agentName} user={user} agent={agent} rawAgent={rawAgent} isLoading={agentIsLoading} />
              </LargePaddingWrapper>
            )}

            {currentTab === CONTACTS && (
              <LargePaddingWrapper>
                <DashboardContactsSectionContainer
                  id="contacts"
                  sectionFilters={contactsSectionFilters}
                  entityType={AGENT_ENTITY_TYPE}
                  entityId={id}
                  entityName={name}
                />
              </LargePaddingWrapper>
            )}
            {currentTab === MESSAGES && (
              <>
                {!selectedConversation &&
                  <DashboardMessagesContainerWrapper>
                    <DashboardMessagesContainer
                      onConversationClick={setSelectedConversation}
                      heading="Conversations"
                      agentId={id}
                    />
                  </DashboardMessagesContainerWrapper>
                }
                {selectedConversation &&
                  <ConversationMessagesContainer
                    conversationId={selectedConversation.id}
                    sendMessageFormPlaceholder={`Message ${name}...`}
                    onBackClick={() => setSelectedConversation(null)}
                  />
                }
              </>
            )}
          </TabWrapper>
        </div>
        <DashboardMyFamilyStickyFooterContainer
          options={stickyFooterOptions}
          showAskQuestionButton
        />
      </StyledDashboardTwoColumnTemplate>
    );
  }
}
