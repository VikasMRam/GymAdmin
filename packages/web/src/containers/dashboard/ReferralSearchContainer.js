import React, { Component } from 'react';
import * as immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { arrayOf, func, oneOf, object } from 'prop-types';

import { normalizeResponse, query } from 'sly/web/services/api';
import { adminCommunityPropType } from 'sly/common/propTypes/community';
import { adminAgentPropType } from 'sly/common/propTypes/agent';
import userPropType from 'sly/common/propTypes/user';
import clientPropType from 'sly/common/propTypes/client';
import { newProvider, newParentClient, newContact, newSlyEntity } from 'sly/web/constants/payloads/client';
import { normJsonApi } from 'sly/web/services/helpers/jsonApi';
import DashboardCommunityReferrals from 'sly/web/components/organisms/DashboardCommunityReferrals';
import DashboardCommunityReferralSearch from 'sly/web/components/organisms/DashboardCommunityReferralSearch';
import DashboardAgentReferrals from 'sly/web/components/organisms/DashboardAgentReferrals';
import DashboardAgentReferralSearch from 'sly/web/components/organisms/DashboardAgentReferralSearch';
import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import DashboardCommunityReferralContactDetailsContainer from 'sly/web/containers/DashboardCommunityReferralContactDetailsContainer';
import DashboardAgentReferralContactDetailsContainer from 'sly/web/containers/DashboardAgentReferralContactDetailsContainer';
import { PLATFORM_ADMIN_ROLE } from 'sly/common/constants/roles';
import { userIs } from 'sly/web/services/helpers/role';

@query('getCommunities', 'getCommunities')
@query('getAgents', 'getAgents')
@query('createClient', 'createClient')
@query('createContact', 'createContact')

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
    user: userPropType,
    getAgents: func,
    getCommunities: func,
    createClient: func,
    refetchClient: func,
    createContact: func,
    change: func,
    onLocationChange: func,
  };

  static defaultProps = {
    referralMode: 'Community',
  };

  state = {
    communities: null,
    agents: null,
    selectedCommunity: null,
    selectedAgent: null,
  };

  onCommunitySendReferralComplete = (data, { reset }) => {
    const { refetchClient } = this.props;
    const { selectedCommunity } = this.state;
    const { email, name, slyMessage } = data;
    const { id } = selectedCommunity;
    const canCreateContact = this.getCanCreateContact(selectedCommunity, data);
    const chain = partner => this.sendReferral(partner)
      .then(reset)
      .then(() => this.setSelectedCommunity(null))
      .then(refetchClient);
    const partner = {
      id,
      type: 'Property',
      slyMessage,
    };
    if (canCreateContact) {
      return this.createContactForProvider({ email, name }, partner).then(() => chain(partner));
    }
    return chain(partner);
  };

  onAgentSendReferralComplete = (data, { reset }) => {
    const { refetchClient } = this.props;
    const { selectedAgent } = this.state;
    const { email, name, slyMessage } = data;
    const { id } = selectedAgent;
    const canCreateContact = this.getCanCreateContact(selectedAgent, data);
    const chain = partner => this.sendReferral(partner)
      .then(reset)
      .then(() => this.setSelectedAgent(null))
      .then(refetchClient);
    const partner = {
      id,
      type: 'PartnerAgent',
      slyMessage,
    };
    if (canCreateContact) {
      return this.createContactForProvider({ email, name }, partner)
        .then(() => chain(partner));
    }
    return chain(partner);
  };

  getCanCreateContact = (selectedPartner, data) => {
    const { contacts = [] } = selectedPartner;
    let canCreateContact = false;
    if (contacts.length === 0) {
      canCreateContact = true;
    } else if (contacts.length > 0) {
      // Make sure to use the correct contacts object as the one used in render method
      const contact = contacts[0];
      const { email, name } = contact;
      if (email !== data.email || name !== data.name) {
        canCreateContact = true;
      }
    }
    return canCreateContact;
  }

  getSelectedCommunity = () => {
    const { selectedCommunity } = this.state;
    return selectedCommunity;
  };

  setSelectedCommunity = (selectedCommunity) => {
    this.setState({ selectedCommunity });
    return selectedCommunity;
  };

  getSelectedAgent = () => {
    const { selectedAgent } = this.state;
    return selectedAgent;
  };

  setSelectedAgent = (selectedAgent) => {
    this.setState({ selectedAgent });
    return selectedAgent;
  };
  handleLocationAgentSearch = (location) => {
    console.log('Handle Location Search ', location);
    // TODO Get lat,lng,string from // by default 30 mile radius
    // geo = "37.402608,-121.875052,30"
    // return this.doAgentSearch({geo});
  };
  handleLocationCommunitySearch = (location) => {
    console.log('Handle Location Search ', location);
    // geo = "37.402608,-121.875052,30"
    // return this.doCommunitySearch({geo});
  };

  getSearchFilters = (nameOrZip) => {
    // Based on regex matching use name or zip
    const zipRe = new RegExp(/^\d{5}(-\d{4})?$/);
    const filters = {};
    if (nameOrZip.match(zipRe)) {
      filters['filter[zip]'] = nameOrZip;
    } else {
      filters['filter[name]'] = nameOrZip;
    }
    return filters;
  };

  getGeoFromLocationValue = (value) => {
    if (value && value.searchParams) {
      return [value.searchParams.latitude, value.searchParams.longitude, 10].join(',');
    }
    return null;
  };

  doCommunitySearch = ({ name, geo }) => {
    const { getCommunities } = this.props;
    // const filters = this.getSearchFilters(nameOrZip);
    const filters = {};
    if (geo) {
      filters['filter[geo]'] = this.getGeoFromLocationValue(geo);
    }
    if (name) {
      filters['filter[name]'] = name;
    }
    return getCommunities(filters).then((resp) => {
      const communities = normalizeResponse(resp.body);
      return this.setState({
        communities,
      });
    });
  };

  doAgentSearch = ({ name, geo }) => {
    const { getAgents } = this.props;
    const filters = {};
    if (geo) {
      filters['filter[geo]'] = this.getGeoFromLocationValue(geo);
    }
    if (name) {
      filters['filter[name]'] = name;
    }
    return getAgents(filters).then((resp) => {
      const allAgents = normJsonApi(resp);
      const agents = allAgents.filter(e => !e.info.excludeFromMap);
      this.setState({
        agents,
      });
    });
  };

  createContactForProvider = ({ email, name }, partner) => {
    const { createContact } = this.props;
    const { id, type } = partner;
    const contact = immutable.wrap(pick(newContact, ['id', 'type', 'attributes', 'relationships']));
    contact.set('id', null);
    contact.set('type', 'Contact');
    contact.set('attributes.email', email);
    contact.set('attributes.name', name);
    const slyEntity = immutable.wrap(pick(newSlyEntity, ['id', 'type', 'attributes']));
    slyEntity.set('id', id);
    slyEntity.set('type', 'SlyEntity');
    slyEntity.set('attributes.entityType', type);
    contact.set('relationships.entities', { data: [slyEntity.value()] });
    const newContactPayload = contact.value();
    return createContact(newContactPayload);
  }

  sendReferral = (partner) => {
    const {
      createClient, parentRawClient, notifyInfo, notifyError,
    } = this.props;
    const newBareClient = immutable.wrap(pick(parentRawClient, ['id', 'type', 'attributes.clientInfo', 'attributes.uuid', 'relationships']));
    newBareClient.set('id', null);
    newBareClient.set('attributes.clientInfo.slyMessage', partner.slyMessage);
    newBareClient.set('attributes.clientInfo.referralSource', '');
    const provider = immutable.wrap(pick(newProvider, ['id', 'type', 'attributes']));
    provider.set('id', partner.id);
    provider.set('type', 'Provider');
    provider.set('attributes.entityType', partner.type);
    newBareClient.set('relationships.provider', { data: provider.value() });
    const parent = immutable.wrap(pick(newParentClient, ['id', 'type', 'attributes']));
    parent.set('id', parentRawClient.id);
    parent.set('type', 'Client');
    newBareClient.set('relationships.parent', { data: parent.value() });
    newBareClient.set('relationships.admin', {});
    newBareClient.set('relationships.organization', {});
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
      referralMode, parentClient, user,
    } = this.props;
    const { communitiesInterested, children: childrenClients, clientInfo, recommendedAgents: allRecommendedAgents, uuidAux } = parentClient;
    let { slyCommunityMessage: communityMessage, slyAgentMessage: agentMessage } = clientInfo;
    if (communityMessage === undefined || communityMessage === "") {
      communityMessage = "I look forward to working with you to help meet this client's needs."
    }
    if (agentMessage === undefined || agentMessage === "") {
      agentMessage = "We look forward to working with you to help meet this client's needs."
    }

    const { uuidInfo } = uuidAux;
    const { locationInfo } = uuidInfo;
    const { communities, agents } = this.state;
    const communityReferralClients = [];
    const agentReferralClients = [];
    childrenClients.forEach((childrenClient) => {
      const { provider } = childrenClient;
      const { entityType } = provider;
      if (entityType === 'PartnerAgent') {
        agentReferralClients.push(childrenClient);
      } else if (entityType === 'Property') {
        communityReferralClients.push(childrenClient);
      }
    });
    const isAdminUser = userIs(user, PLATFORM_ADMIN_ROLE);
    const communitiesInterestedIdsMap = communitiesInterested.reduce((accumulator, community) => {
      accumulator[community.id] = community;
      return accumulator;
    }, {});
    const childrenClientCommunityIdsMap = communityReferralClients.reduce((accumulator, client) => {
      accumulator[client.provider.id] = client;
      return accumulator;
    }, {});
    const recommendedAgentsFiltered =  allRecommendedAgents.filter(e => !e.info.excludeFromMap);
    const recommendedAgentsIdsMap = recommendedAgentsFiltered.reduce((accumulator, community) => {
      accumulator[community.id] = community;
      return accumulator;
    }, {});
    const childrenClientAgentIdsMap = agentReferralClients.reduce((accumulator, client) => {
      accumulator[client.provider.id] = client;
      return accumulator;
    }, {});
    // FIXME: @fonz, how does dynamic component choosing look? How do we choose properties , can we do
    if (referralMode === 'Community') {
      const selectedCommunity = this.getSelectedCommunity();
      const contact = (selectedCommunity && selectedCommunity.contacts && selectedCommunity.contacts.length > 0) ? selectedCommunity.contacts[0] : null;
      const contactFormInitialValues = { slyMessage: communityMessage };
      if (contact) {
        const { email, name } = contact;
        contactFormInitialValues.email = email;
        contactFormInitialValues.name = name;
      }
      return (
        <WizardController
          formName="SendCommunityReferral"
          controllerKey="SendCommunityReferralControllerKey"
          onComplete={(data, { reset }) => this.onCommunitySendReferralComplete(data, { reset })}
          // todo: final step return to first step
          // onStepChange={params => handleStepChange({ ...params, openConfirmationModal })}
        >
          {({
            data, onSubmit, isFinalStep, submitEnabled, next, previous, goto, currentStep, ...props
          }) => {
            return (
              <WizardSteps {...props}>
                <WizardStep
                  component={DashboardCommunityReferrals}
                  onSubmit={onSubmit}
                  name="DashboardCommunityReferrals"
                  communitiesInterested={communitiesInterested}
                  communitiesInterestedIdsMap={communitiesInterestedIdsMap}
                  childrenClients={communityReferralClients}
                  childrenClientCommunityIdsMap={childrenClientCommunityIdsMap}
                  isAdminUser={isAdminUser}
                  sendNewReferral={this.sendReferral}
                  setSelectedCommunity={(c) => { this.setSelectedCommunity(c); goto('DashboardCommunityReferralContactDetailsContainer'); }}
                />
                <WizardStep
                  component={DashboardCommunityReferralSearch}
                  subtitle="Send referral to community"
                  onSubmit={onSubmit}
                  name="DashboardCommunityReferralSearch"
                  communities={communities}
                  isAdminUser={isAdminUser}
                  childrenClients={communityReferralClients}
                  childrenClientCommunityIdsMap={childrenClientCommunityIdsMap}
                  communitiesInterestedIdsMap={communitiesInterestedIdsMap}
                  handleCommunitySearch={this.doCommunitySearch}
                  handleLocationSearch={this.handleLocationCommunitySearch}
                  preferredLocation={locationInfo}
                  setSelectedCommunity={(c) => { this.setSelectedCommunity(c); goto('DashboardCommunityReferralContactDetailsContainer'); }}
                />
                <WizardStep
                  component={DashboardCommunityReferralContactDetailsContainer}
                  onSubmit={onSubmit}
                  onChangeCommunity={() => goto('DashboardCommunityReferralSearch')}
                  name="DashboardCommunityReferralContactDetailsContainer"
                  community={selectedCommunity}
                  communitiesInterestedIdsMap={communitiesInterestedIdsMap}
                  initialValues={contactFormInitialValues}
                  isAdminUser={isAdminUser}
                />
              </WizardSteps>
            );
          }}
        </WizardController>
      );
    }
    // Agent Referral Flow

    const selectedAgent = this.getSelectedAgent();
    const contact = (selectedAgent && selectedAgent.contacts &&  selectedAgent.contacts.length > 0) ? selectedAgent.contacts[0] : null;
    const contactFormInitialValues = { slyMessage: agentMessage };
    if (contact) {
      const { email, name } = contact;
      contactFormInitialValues.email = email;
      contactFormInitialValues.name = name;
    }
    return (
      <WizardController
        formName="SendAgentReferral"
        controllerKey="SendAgentReferralControllerKey"
        onComplete={(data, { reset }) => this.onAgentSendReferralComplete(data, { reset })}
      >
        {({
          data, onSubmit, isFinalStep, submitEnabled, next, previous, goto, currentStep, ...props
        }) => {
          return (
            <WizardSteps {...props}>
              <WizardStep
                component={DashboardAgentReferrals}
                recommendedAgents={recommendedAgentsFiltered}
                recommendedAgentsIdsMap={recommendedAgentsIdsMap}
                onSendNewReferralClick={onSubmit}
                name="DashboardAgentReferrals"
                childrenClients={agentReferralClients}
                setSelectedAgent={(a) => { this.setSelectedAgent(a); goto('DashboardAgentReferralContactDetailsContainer'); }}
              />
              <WizardStep
                component={DashboardAgentReferralSearch}
                onSubmit={onSubmit}
                name="DashboardAgentReferralSearch"
                handleAgentSearch={this.doAgentSearch}
                handleLocationSearch={this.handleLocationAgentSearch}
                agents={agents}
                childrenClientAgentIdsMap={childrenClientAgentIdsMap}
                preferredLocation={locationInfo}
                setSelectedAgent={(a) => { this.setSelectedAgent(a); goto('DashboardAgentReferralContactDetailsContainer'); }}
              />
              <WizardStep
                component={DashboardAgentReferralContactDetailsContainer}
                onSubmit={onSubmit}
                onChangeAgent={() => goto('DashboardAgentReferralSearch')}
                name="DashboardAgentReferralContactDetailsContainer"
                agent={selectedAgent}
                initialValues={contactFormInitialValues}
              />
            </WizardSteps>
          );
        }}
      </WizardController>
    );
  }
}
