import React, { Component } from 'react';
import { query, prefetch } from 'sly/services/newApi';
import { arrayOf, func, oneOf } from 'prop-types';
import { adminCommunityPropType } from 'sly/propTypes/community';
import { adminAgentPropType } from 'sly/propTypes/agent';
import  clientPropType from 'sly/propTypes/client';
import { newProvider } from 'sly/constants/payloads/client';
import DashboardCommunityReferrals from 'sly/components/organisms/DashboardCommunityReferrals';
import DashboardAgentReferrals from 'sly/components/organisms/DashboardAgentReferrals';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';

@query('getCommunities', 'getCommunities')
@query('getAgents', 'getAgents')
@query('createClient', 'createClient')

export default class ReferralSearchContainer extends Component {
  static propTypes = {
    notifyError: func,
    notifyInfo: func,
    communities: arrayOf(adminCommunityPropType),
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
  };

  doCommunitySearch = ({ name, zip }) => {
    const { getCommunities } = this.props;
    const filters = {
      'filter[name]': name,
      'filter[zip]': zip,
    };
    return getCommunities(filters).then((r) => {
      this.setState({
        communities: r.data,
      });
    });
  };

  doAgentSearch = (filters) => {
    const { getAgents } = this.props;
    return getAgents(filters).then((r) => {
      this.setState({
        agents: r.data,
      });
    });
  };

  sendReferral = (partner) => {
    const { createClient, parentClient, notifyInfo, notifyError } = this.props;
    console.log('Going to send referral for', parentClient.name);
    const newBareClient = immutable(pick(parentClient, ['id', 'type', 'attributes.clientInfo', 'attributes.uuid', 'relationships']));
    // newBareClient.set('id', null);
    newBareClient.set('attributes.parentID', parentClient.id);
    const provider = immutable(pick, newProvider, ['id', 'type', 'attributes']);
    provider.set('id', partner.id);
    provider.set('attributes.entityType', partner.type);
    newBareClient.set('relationships.provider', {});
    const newChildClient = newBareClient.value();
    console.log('This is the body of the reques',newChildClient);
    createClient(newChildClient).then((r) => {
      console.log('Saw response r', r);
      notifyInfo('Sent referrral successfully');
    });
  };

  render() {
    const {
      referralMode,
    } = this.props;
    const { communities, agents } = this.state;
    console.log('This sate is changing',communities);
    if (referralMode === 'Community') {
      return (<DashboardCommunityReferrals
        communities={communities}
        handleCommunitySearch={this.doCommunitySearch}
        sendReferral={this.sendReferral}
      />);
    }

    return (<DashboardAgentReferrals
      agents={agents}
      handleAgentSearch={this.doAgentSearch}
      sendReferral={this.sendReferral}
    />);
  }
}
