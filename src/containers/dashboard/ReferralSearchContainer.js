import React, { Component } from 'react';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { arrayOf, func, oneOf, object } from 'prop-types';

import { query } from 'sly/services/newApi';
import { adminCommunityPropType } from 'sly/propTypes/community';
import { adminAgentPropType } from 'sly/propTypes/agent';
import clientPropType from 'sly/propTypes/client';
import { newProvider, newParentClient } from 'sly/constants/payloads/client';
import { normJsonApi } from 'sly/services/helpers/jsonApi';
import DashboardCommunityReferrals from 'sly/components/organisms/DashboardCommunityReferrals';
import DashboardCommunityReferralSearch from 'sly/components/organisms/DashboardCommunityReferralSearch';
import DashboardAgentReferrals from 'sly/components/organisms/DashboardAgentReferrals';
import DashboardAgentReferralSearch from 'sly/components/organisms/DashboardAgentReferralSearch';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import DashboardCommunityReferralContactDetailsContainer from 'sly/containers/DashboardCommunityReferralContactDetailsContainer';
import DashboardAgentReferralContactDetailsContainer from 'sly/containers/DashboardAgentReferralContactDetailsContainer';

@query('getCommunities', 'getCommunities')
@query('getAgents', 'getAgents')
@query('createClient', 'createClient')

export default class ReferralSearchContainer extends Component {
  static propTypes = {
    notifyError: func,
    notifyInfo: func,
    communities: arrayOf(adminCommunityPropType),
    selectedCommunity: adminCommunityPropType,
    agents: arrayOf(adminAgentPropType),
    referralMode: oneOf(['Agent', 'Community']),
    parentClient: clientPropType.isRequired,
    parentRawClient: object,
    getAgents: func,
    getCommunities: func,
    createClient: func,
    refetchClient: func,
  };
  static defaultProps = {
    referralMode: 'Community',
  };

  state = {
    communities: [],
    agents: [],
    selectedCommunity: null,
    selectedAgent: null,
  };

  onCommunitySendReferralComplete = (data, { reset }) => {
    const { refetchClient } = this.props;
    const { selectedCommunity } = this.state;
    const partner = {
      id: selectedCommunity.id,
      type: 'Property',
    };
    return this.sendReferral(partner)
      .then(reset)
      .then(() => this.setSelectedCommunity(null))
      .then(() => refetchClient());
  };

  onAgentSendReferralComplete = (data, { reset }) => {
    const { refetchClient } = this.props;
    const { selectedAgent } = this.state;
    const partner = {
      id: selectedAgent.id,
      type: 'PartnerAgent',
    };
    return this.sendReferral(partner)
      .then(reset)
      .then(() => this.setSelectedAgent(null))
      .then(() => refetchClient());
  };

  getSelectedCommunity = () => {
    const { selectedCommunity } = this.state;
    return selectedCommunity;
  }

  setSelectedCommunity = (selectedCommunity) => {
    this.setState({ selectedCommunity });
    return selectedCommunity;
  }

  getSelectedAgent = () => {
    const { selectedAgent } = this.state;
    return selectedAgent;
  }

  setSelectedAgent = (selectedAgent) => {
    this.setState({ selectedAgent });
    return selectedAgent;
  }

  getSearchFilters = (nameOrZip) => {
  // Based on regex matching use name or zip
    const filters = {};
    if (nameOrZip.match(this.zipRe)) {
      filters['filter[zip]'] = nameOrZip;
    } else {
      filters['filter[name]'] = nameOrZip;
    }
  }
  zipRe = new RegExp(/^\d{5}(-\d{4})?$/);

  transformAgent = (agent) => {
    let workPhone = null;
    let cellPhone = null;
    const { name: businessName, info, contacts } = agent;
    const { slyScore, displayName: name, last5DayLeadCount: leadCount } = info;
    if (contacts && contacts.length > 0) {
      const [contact] = contacts;
      // FIXME: Use destucturing
      workPhone = contact.workPhone;
      cellPhone = contact.mobilePhone;
    }
    const agentProps = {
      key: name,
      name,
      slyScore,
      businessName,
      workPhone,
      cellPhone,
      leadCount,
    };
    return agentProps;
  }

  doCommunitySearch = ({ nameOrZip }) => {
    const { getCommunities } = this.props;
    const filters = this.getSearchFilters(nameOrZip);
    return getCommunities(filters).then((resp) => {
      const communities = normJsonApi(resp);
      return this.setState({
        communities,
      });
    });
  };

  doAgentSearch = ({ nameOrZip }) => {
    const { getAgents } = this.props;
    const filters = this.getSearchFilters(nameOrZip);

    return getAgents(filters).then((resp) => {
      const agents = normJsonApi(resp);
      console.log('Seeing these agents ', agents);
      this.setState({
        agents,
      });
    });
  };

  sendReferral = (partner) => {
    const {
      createClient, parentRawClient, notifyInfo, notifyError,
    } = this.props;
    const newBareClient = immutable(pick(parentRawClient, ['id', 'type', 'attributes.clientInfo', 'attributes.uuid', 'relationships']));
    newBareClient.set('id', null);
    const provider = immutable(pick, newProvider, ['id', 'type', 'attributes']);
    provider.set('id', partner.id);
    provider.set('type', 'Provider');
    provider.set('attributes.entityType', partner.type);
    newBareClient.set('relationships.provider', { data: provider.value() });
    const parent = immutable(pick, newParentClient, ['id', 'type', 'attributes']);
    parent.set('id', parentRawClient.id);
    parent.set('type', 'Client');
    newBareClient.set('relationships.parent', { data: parent.value() });
    newBareClient.set('relationships.admin', {});
    const newChildClient = newBareClient.value();
    return createClient(newChildClient).then(() => {
      notifyInfo('Sent referrral successfully');
    }, (e) => {
      console.log('Saw error, e', e);
      notifyError('Error sending referral, contact support');
    });
  };

  render() {
    const {
      referralMode, parentClient,
    } = this.props;
    const { communitiesInterested, children: childrenClients } = parentClient;
    const { communities, agents } = this.state;
    const communitiesInterestedIdsMap = communitiesInterested.reduce((accumulator, community) => {
      accumulator[community.id] = community;
      return accumulator;
    }, {});
    const childrenClientCommunityIdsMap = childrenClients.reduce((accumulator, client) => {
      accumulator[client.provider.id] = client;
      return accumulator;
    }, {});
    // FIXME: @fonz, how does dynamic component choosing look? How do we choose properties , can we do
    // const modeCompMap = { 'Community': DashboardCommunityReferrals, 'Agent': DashboardAgentReferrals };
    // const ModeComp = modeCompMap[referralMode];
    // return <ModeComp
    //          communities={communities}
    //          handleCommunitySearch={this.doCommunitySearch}
    //          sendReferral={this.sendReferral} /> ;
    if (referralMode === 'Community') {
      return (
        <WizardController
          formName="SendCommunityReferral"
          onComplete={(data, { reset }) => this.onCommunitySendReferralComplete(data, { reset })}
          // todo: final step return to first step
          // onStepChange={params => handleStepChange({ ...params, openConfirmationModal })}
        >
          {({
            data, onSubmit, isFinalStep, submitEnabled, next, previous, goto, currentStep, ...props
          }) => {
            return (
              <WizardSteps currentStep={currentStep} {...props}>
                <WizardStep
                  component={DashboardCommunityReferrals}
                  onSubmit={onSubmit}
                  name="DashboardCommunityReferrals"
                  communitiesInterested={communitiesInterested}
                  communitiesInterestedIdsMap={communitiesInterestedIdsMap}
                  childrenClients={childrenClients}
                  childrenClientCommunityIdsMap={childrenClientCommunityIdsMap}
                  handleCommunitySearch={this.doCommunitySearch}
                  sendNewReferral={this.sendReferral}
                  setSelectedCommunity={(c) => { this.setSelectedCommunity(c); goto(3); }}
                />
                <WizardStep
                  component={DashboardCommunityReferralSearch}
                  onSubmit={onSubmit}
                  name="DashboardCommunityReferralSearch"
                  communities={communities}
                  childrenClients={childrenClients}
                  childrenClientCommunityIdsMap={childrenClientCommunityIdsMap}
                  handleCommunitySearch={this.doCommunitySearch}
                  setSelectedCommunity={(c) => { this.setSelectedCommunity(c); goto(3); }}
                />
                <WizardStep
                  component={DashboardCommunityReferralContactDetailsContainer}
                  onSubmit={onSubmit}
                  onChangeCommunity={previous}
                  name="DashboardCommunityReferralContactDetailsContainer"
                  community={this.getSelectedCommunity()}
                />
              </WizardSteps>
            );
          }}
        </WizardController>
      );
    }

    return (
      <WizardController
        formName="SendAgentReferral"
        onComplete={(data, { reset }) => this.onAgentSendReferralComplete(data, { reset })}
      >
        {({
          data, onSubmit, isFinalStep, submitEnabled, next, previous, goto, currentStep, ...props
        }) => {
          return (
            <WizardSteps currentStep={currentStep} {...props}>
              <WizardStep
                component={DashboardAgentReferrals}
                onSendNewReferralClick={onSubmit}
                name="DashboardAgentReferrals"
              />
              <WizardStep
                component={DashboardAgentReferralSearch}
                onSubmit={onSubmit}
                name="DashboardAgentReferralSearch"
                handleAgentSearch={this.doAgentSearch}
                agents={agents}
                transformAgent={this.transformAgent}
                setSelectedAgent={(a) => { this.setSelectedAgent(a); goto(3); }}
              />
              <WizardStep
                component={DashboardAgentReferralContactDetailsContainer}
                onSubmit={onSubmit}
                onChangeAgent={previous}
                name="DashboardAgentReferralContactDetailsContainer"
                agent={this.getSelectedAgent() ? this.transformAgent(this.getSelectedAgent()) : null}
              />
            </WizardSteps>
          );
        }}
      </WizardController>
    );
  }
}
