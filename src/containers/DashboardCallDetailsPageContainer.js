import React, { Component } from 'react';
import { string, object } from 'prop-types';
import { generatePath } from 'react-router';

import { prefetch, query } from 'sly/services/newApi';
import { AGENT_DASHBOARD_FAMILIES_DETAILS_PATH } from 'constants/dashboardAppPaths';
import NotificationController from 'sly/controllers/NotificationController';
import DashboardCallDetailsPage from 'sly/components/pages/DashboardCallDetailsPage';

@prefetch('voiceCall', 'getVoiceCall', (req, { match }) => req({
  id: match.params.id,
}))

export default class DashboardCallDetailsPageContainer extends Component {
  static propTypes = {
    id: string,
    voiceCall: object,
    history: object,
  };

  state = {
    name: null,
    zip: null,
  };

  handleCommunitySearch = ({ name, zip }) => {
    this.setState({ name, zip });
  };

  handleNewClientSubmit = (data) => {
    const { history } = this.props;
    const clientPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id: data.id });
    history.push(clientPath);
  };

  render() {
    const { voiceCall } = this.props;
    if (!voiceCall) {
      return <div>Loading...</div>;
    }

    const { name, zip } = this.state;

    const query = (!name && !zip) ? ({ phone: voiceCall.toNumber }) : ({ name, zip });

    const meta = {
      referralSource: ['Direct Call', 'Online'], lookingFor: ['Father', 'Mother'], gender: ['Female', 'Male'], timeToMove: ['Now','1+ Months', '3+ Months'], monthlyBudget: ['Under $2000', '$2k-$3k', '$3k-$4k', '$4k+'],
    };

    return (
      <NotificationController>
        { ({
        notifyInfo,
        notifyError,
        }) => (
          <DashboardCallDetailsPage notifyInfo={notifyInfo} notifyError={notifyError} postCreateClient={this.handleNewClientSubmit} meta={meta} voiceCall={voiceCall} query={query} handleCommunitySearch={this.handleCommunitySearch} />
        )}
      </NotificationController>
    );
  }
}
