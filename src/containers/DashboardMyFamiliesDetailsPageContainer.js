import React, { Component } from 'react';
import { object } from 'prop-types';

import { prefetch } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import ModalController from 'sly/controllers/ModalController';
import DashboardMyFamiliesDetailsPage from 'sly/components/pages/DashboardMyFamiliesDetailsPage';

@prefetch('client', 'getClient', (req, { match }) => req({
  id: match.params.id,
}))

export default class DashboardMyFamiliesDetailsPageContainer extends Component {
  static propTypes = {
    client: clientPropType,
    match: object,
  };

  render() {
    const { client, match } = this.props;

    return (
      <ModalController>
        {({
          show,
          hide,
        }) => (
          <DashboardMyFamiliesDetailsPage
            client={client}
            currentTab={match.params.tab}
            showModal={show}
            hideModal={hide}
          />
        )}
      </ModalController>
    );
  }
}
