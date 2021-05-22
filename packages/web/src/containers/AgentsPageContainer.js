import React, { Component } from 'react';
import { object, func } from 'prop-types';

import SlyEvent from 'sly/web/services/helpers/events';
import withNotification from 'sly/web/components/helpers/notification';
import AgentsPage from 'sly/web/components/pages/AgentsPage';
import { urlize } from 'sly/web/services/helpers/url';

@withNotification

export default class AgentsPageContainer extends Component {
  static propTypes = {
    history: object,
    notifyInfo: func,
  };

  handleLocationSearch = (result) => {
    const { history } = this.props;
    const event = {
      action: 'submit', category: 'agentsSearch', label: result.displayText,
    };
    SlyEvent.getInstance().sendEvent(event);
    const [city, state] = result.name.split(', ');
    history.push(`/agents/region/${urlize(city)}-${state}`);
  };

  handleConsultationRequested = () => {
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
        onConsultationRequested={this.handleConsultationRequested}
      />
    );
  }
}

