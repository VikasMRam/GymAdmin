import React, { Component } from 'react';

import { prefetch } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import DashboardMyFamiliesDetailsPage from 'sly/components/pages/DashboardMyFamiliesDetailsPage';

@prefetch('client', 'getClient', (req, { match }) => req({
  id: match.params.id,
}))

export default class DashboardMyFamiliesDetailsPageContainer extends Component {
  static propTypes = {
    client: clientPropType,
  };

  render() {
    const { client } = this.props;

    return (
      <DashboardMyFamiliesDetailsPage client={client} />
    );
  }
}
