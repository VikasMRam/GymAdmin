import React, { Component } from 'react';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { arrayOf, func, oneOf, object } from 'prop-types';
import build from 'redux-object';

import { query } from 'sly/services/newApi';
import { adminCommunityPropType } from 'sly/propTypes/community';
import { adminAgentPropType } from 'sly/propTypes/agent';
import clientPropType from 'sly/propTypes/client';
import { newProvider, newParentClient } from 'sly/constants/payloads/client';
import DashboardCommunityReferrals from 'sly/components/organisms/DashboardCommunityReferrals';
import DashboardCommunityReferralSearch from 'sly/components/organisms/DashboardCommunityReferralSearch';
import DashboardAgentReferrals from 'sly/components/organisms/DashboardAgentReferrals';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import DashboardCommunityReferralContactDetailsContainer from 'sly/containers/DashboardCommunityReferralContactDetailsContainer';

const normJsonApi = (resp) => {
  const { data, included } = resp.body;
  let normalizedResult = [];
  let result = data.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = {};
    }
    acc[item.type][item.id] = item;
    return acc;
  }, {});
  result = included.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = {};
    }
    acc[item.type][item.id] = item;
    return acc;
  }, result);
  const ids = normalizedResult.map(({ id }) => id);
  normalizedResult = data.reduce((acc, elem) => {
    if (!ids.includes(elem.id)) {
      acc.push(build(result, elem.type, elem.id, { eager: true }));
    }
    return acc;
  }, normalizedResult);
  return normalizedResult;
};

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
    //TODO: GET NEW CLIENT and reload
  };

  getSelectedCommunity = () => {
    const { selectedCommunity } = this.state;
    return selectedCommunity;
  }

  setSelectedCommunity = (selectedCommunity) => {
    this.setState({ selectedCommunity });
    return selectedCommunity;
  }

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
      const communities = normJsonApi(resp);
      console.log('Seeing these communities ', communities);
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
      createClient, parentRawClient, notifyInfo, notifyError,
    } = this.props;
    const newBareClient = immutable(pick(parentRawClient, ['id', 'type', 'attributes.clientInfo', 'attributes.uuid', 'relationships']));
    newBareClient.set('id', null);
    const provider = immutable(pick, newProvider, ['id', 'type', 'attributes']);
    provider.set('id', partner.id);
    provider.set('type', 'Provider');
    // FIXME: Set entityType from the partner object
    // provider.set('attributes.entityType', partner.type);
    provider.set('attributes.entityType', 'Property');
    newBareClient.set('relationships.provider', { data: provider.value() });
    const parent = immutable(pick, newParentClient, ['id', 'type', 'attributes']);
    parent.set('id', parentRawClient.id);
    parent.set('type', 'Client');
    newBareClient.set('relationships.parent', { data: parent.value() });
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
    const { communitiesInterested } = parentClient;
    const { communities, agents } = this.state;
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
            data, onSubmit, isFinalStep, submitEnabled, next, previous, currentStep, ...props
          }) => {
            return (
              <WizardSteps currentStep={currentStep} {...props}>
                <WizardStep
                  component={DashboardCommunityReferrals}
                  onSubmit={onSubmit}
                  name="DashboardCommunityReferrals"
                  communitiesInterested={communitiesInterested}
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

    return (<DashboardAgentReferrals
      agents={agents}
      handleAgentSearch={this.doAgentSearch}
      sendReferral={this.sendReferral}
    />);
  }
}
