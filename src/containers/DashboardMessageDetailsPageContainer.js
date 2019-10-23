import React, { Component } from 'react';
import { object } from 'prop-types';

import DashboardMessageDetailsPage from 'sly/components/pages/DashboardMessageDetailsPage';

export default class DashboardMessageDetailsPageContainer extends Component {
  static propTypes = {
    match: object,
  };

  render() {
    const { match } = this.props;

    return (
      <DashboardMessageDetailsPage
        conversationId={match.params.id}
      />
    );
  }
}
