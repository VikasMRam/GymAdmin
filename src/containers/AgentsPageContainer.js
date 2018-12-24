import React, { Component } from 'react';
import { func } from 'prop-types';

import SlyEvent from 'sly/services/helpers/events';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/agents';
import AgentsPage from 'sly/components/pages/AgentsPage';

class AgentsPageContainer extends Component {
  static propTypes = {
    history: func,
  };

  handleSubmitForm = () => {
    console.log('handleSubmitForm');
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
    const { handleSubmitForm, handleLocationSearch } = this;

    return (
      <AgentsPage onSubmitForm={handleSubmitForm} onLocationSearch={handleLocationSearch} />
    );
  }
}

export default AgentsPageContainer;
