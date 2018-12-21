import React, { Component } from 'react';
import { func } from 'prop-types';

import AgentsPage from 'sly/components/pages/AgentsPage';

class AgentsPageContainer extends Component {
  static propTypes = {
    history: func,
  };

  handleSubmitForm = () => {
    console.log('handleSubmitForm');
  };

  handleLocationSearch = (value) => {
    // const { history } = this.props;

    console.log('handleLocationSearch', value);
  };

  render() {
    const { handleSubmitForm, handleLocationSearch } = this;

    return (
      <AgentsPage onSubmitForm={handleSubmitForm} onLocationSearch={handleLocationSearch} />
    );
  }
}

export default AgentsPageContainer;
