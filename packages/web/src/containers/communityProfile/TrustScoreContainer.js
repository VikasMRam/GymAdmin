import React, { Component } from 'react';

import TrustScoreTile from 'sly/web/components/organisms/profiles/TrustScoreTile';
import SlyEvent from 'sly/web/services/helpers/events';

export default class TrustScoreContainer extends Component {
  static typeHydrationId = 'TrustScoreContainer';
  sendEvent = () => {
    console.log('seeing stuff');
    const { community } = this.props;
    const { id, address: { state } } = community;
    const evt = { category: 'trustScore',
      action: 'click',
      label: id,
      value: state,
    };
    SlyEvent.getInstance().sendEvent(evt);
  }

  render() {
    return <TrustScoreTile externalClickEvt={this.sendEvent} {...this.props} />;
  }
}
