import React, { Component } from 'react';
import { query, prefetch, getRequestInfo } from 'sly/services/newApi';
import { arrayOf, func, oneOf } from 'prop-types';
import { adminCommunityPropType } from 'sly/propTypes/community';
import { adminAgentPropType } from 'sly/propTypes/agent';
import  clientPropType from 'sly/propTypes/client';
import { newProvider } from 'sly/constants/payloads/client';
import DashboardCommunityReferrals from 'sly/components/organisms/DashboardCommunityReferrals';
import DashboardAgentReferrals from 'sly/components/organisms/DashboardAgentReferrals';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  customTestState: 'ReferralSearchContainer',
});

const normJsonApi = (data) => {

  // if( data instanceof Array) {
  //   var entities = [];
  //   data.forEach()
  // }
  // let entity = {};
  return {};

};

@query('getCommunities', 'getCommunities')
// @prefetch('communities', 'getCommunities', (req, { filters }) => {
//   const modQ = {};
//   Object.entries(filters).forEach(([k, v]) => {
//     modQ[`filter[${k}]`] = v;
//   });
//   return req({ ...modQ, include: 'agents' });
// })
@query('getAgents', 'getAgents')
@query('createClient', 'createClient')

@connect(mapStateToProps)

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
      const { data } = r.body;
      console.log('Seeing these communities ', data);

      return this.setState({
        communities: data,
      });
    });
  };

  doAgentSearch = (filters) => {
    const { getAgents } = this.props;

    return getAgents(filters).then((r) => {
      const { data } = r.body;
      console.log('Seeing these agents ',data);
      this.setState({
        agents: data,
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
    console.log('This is the body of the reques', newChildClient);
    createClient(newChildClient).then((r) => {
      console.log('Saw response r', r);
      notifyInfo('Sent referrral successfully');
    }, (e)=> {
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
