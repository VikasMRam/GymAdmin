import React, { Component } from 'react';
import { object, func } from 'prop-types';

import SlyEvent from 'sly/services/helpers/events';
import { filterLinkPath, getSearchParamFromPlacesResponse } from 'sly/services/helpers/agents';
import withNotification from 'sly/controllers/withNotification';
import AgentsPage from 'sly/components/pages/AgentsPage';

@withNotification

export default class AgentsPageContainer extends Component {
  static propTypes = {
    history: object,
    notifyInfo: func,
  };

  handleLocationSearch = (result) => {
    const { history } = this.props;
    const event = {
      action: 'submit', category: 'agentsSearch', label: result.formatted_address,
    };
    SlyEvent.getInstance().sendEvent(event);

    const searchParams = getSearchParamFromPlacesResponse(result);
    const { path } = filterLinkPath(searchParams);
    history.push(path);
  };

  handleConsulationRequested = () => {
    const { notifyInfo } = this.props;

    notifyInfo('We have received your request and we will get back to you soon.');
  };

  render() {
    const { history } = this.props;
    const { location } = history;

    return (
      <AgentsPage
        onLocationSearch={this.handleLocationSearch}
        location={location}
        onConsulationRequested={this.handleConsulationRequested}
      />
    );
  }
}

