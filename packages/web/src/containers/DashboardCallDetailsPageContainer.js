import React, { Component } from 'react';
import { string, object } from 'prop-types';
import { generatePath } from 'react-router';

import { prefetch, query } from 'sly/services/api';
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

    const query = { phone: voiceCall.toNumber };


    return (
      <NotificationController>
        { ({
        notifyInfo,
        notifyError,
        }) => (
          <DashboardCallDetailsPage notifyInfo={notifyInfo} notifyError={notifyError} postCreateClient={this.handleNewClientSubmit} voiceCall={voiceCall} query={query} />
        )}
      </NotificationController>
    );
  }
}
