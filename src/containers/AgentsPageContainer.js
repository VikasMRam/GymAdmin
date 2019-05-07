import React, { Component } from 'react';
import { object } from 'prop-types';

import SlyEvent from 'sly/services/helpers/events';
import { filterLinkPath, getSearchParamFromPlacesResponse } from 'sly/services/helpers/agents';
import AgentsPage from 'sly/components/pages/AgentsPage';

export default class AgentsPageContainer extends Component {
  static propTypes = {
    history: object,
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

  render() {
    const { history } = this.props;
    const { location } = history;
    const { handleLocationSearch } = this;
    return (
      <AgentsPage
        onLocationSearch={handleLocationSearch}
        location={location}
      />
    );
  }
}

