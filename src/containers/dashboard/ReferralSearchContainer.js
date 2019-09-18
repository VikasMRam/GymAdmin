import React, { Component } from 'react';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { arrayOf, func, oneOf } from 'prop-types';

import { normalizeResponse, query } from 'sly/services/newApi';
import { adminCommunityPropType } from 'sly/propTypes/community';
import { adminAgentPropType } from 'sly/propTypes/agent';
import clientPropType from 'sly/propTypes/client';
import { newProvider } from 'sly/constants/payloads/client';
import DashboardCommunityReferrals from 'sly/components/organisms/DashboardCommunityReferrals';
import DashboardCommunityReferralSearch from 'sly/components/organisms/DashboardCommunityReferralSearch';
import DashboardAgentReferrals from 'sly/components/organisms/DashboardAgentReferrals';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import DashboardCommunityReferralContactDetailsContainer from 'sly/containers/DashboardCommunityReferralContactDetailsContainer';

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
    getAgents: func,
    getCommunities: func,
    createClient: func,
  };

  static defaultProps = {
    referralMode: 'Community',
  };

  state = {
    communities: [],
    agents: [],
    selectedCommunity: null,
  };

  onCommunitySendReferralComplete = () => {
    const { selectedCommunity } = this.state;
    const partner = {
      id: selectedCommunity.id,
      type: 'Community',
    };
    return this.sendReferral(partner);
  };

  getSelectedCommunity = () => {
    const { selectedCommunity } = this.state;
    return selectedCommunity;
  };

  setSelectedCommunity = (selectedCommunity) => {
    this.setState({ selectedCommunity });
    return selectedCommunity;
  };

  zipRe = new RegExp(/^\d{5}(-\d{4})?$/);
  doCommunitySearch = ({ nameOrZip }) => {
    const { getCommunities } = this.props;
    // Based on regex matching use name or zip
    const filters = {};
    if (nameOrZip.match(this.zipRe)) {
      filters['filter[zip]'] = nameOrZip;
    } else {
      filters['filter[name]'] = nameOrZip;
    }

    return getCommunities(filters).then((resp) => {
      const communities = normalizeResponse(resp.body);
      return this.setState({
        communities,
      });
    });
  };

  doAgentSearch = (filters) => {
    const { getAgents } = this.props;

    return getAgents(filters).then((r) => {
      const { data } = r.body;
      console.log('Seeing these agents ', data);
      this.setState({
        agents: data,
      });
    });
  };

  sendReferral = (partner) => {
    const {
      createClient, parentClient, notifyInfo, notifyError,
    } = this.props;
    console.log('Going to send referral for', parentClient.name);
    const newBareClient = immutable(pick(parentClient, ['id', 'type', 'attributes.clientInfo', 'attributes.uuid', 'relationships']));
    newBareClient.set('id', null);
    newBareClient.set('type', 'Client');
    newBareClient.set('attributes.parentID', parentClient.id);
    const provider = immutable(pick, newProvider, ['id', 'type', 'attributes']);
    provider.set('id', partner.id);
    provider.set('attributes.entityType', partner.type);
    newBareClient.set('relationships.provider', provider.value());
    const newChildClient = newBareClient.value();
    return createClient(newChildClient).then((r) => {
      notifyInfo('Sent referrral successfully');
    }, (e) => {
      console.log('Saw error, e', e);
      notifyError('Error sending referral, contact support');
    });
  };

  render() {
    const {
      referralMode,
    } = this.props;
    const { communities, agents } = this.state;
    console.log('This state is changing', communities);
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
          onComplete={data => this.onCommunitySendReferralComplete(data)}
          // todo: final step return to first step
          // onStepChange={params => handleStepChange({ ...params, openConfirmationModal })}
        >
          {({
            data, onSubmit, isFinalStep, submitEnabled, next, currentStep, ...props
          }) => {
            return (
              <WizardSteps currentStep={currentStep} {...props}>
                <WizardStep
                  component={DashboardCommunityReferrals}
                  onSubmit={onSubmit}
                  name="DashboardCommunityReferrals"
                  communities={communities}
                  handleCommunitySearch={this.doCommunitySearch}
                  sendNewReferral={this.sendReferral}
                />
                <WizardStep
                  component={DashboardCommunityReferralSearch}
                  onSubmit={onSubmit}
                  name="DashboardCommunityReferralSearch"
                  communities={communities}
                  handleCommunitySearch={this.doCommunitySearch}
                  setSelectedCommunity={this.setSelectedCommunity}
                />
                <WizardStep
                  component={DashboardCommunityReferralContactDetailsContainer}
                  onSubmit={onSubmit}
                  name="DashboardCommunityReferralContactDetailsContainer"
                  community={this.getSelectedCommunity()}
                />
              </WizardSteps>
            );
          }}
        </WizardController>
      );
    }

    return (<DashboardAgentReferrals
      agents={agents}
      handleAgentSearch={this.doAgentSearch}
      sendReferral={this.sendReferral}
    />);
  }
}
