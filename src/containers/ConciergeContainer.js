import React, { Component } from 'react';

import Concierge from 'sly/components/organisms/Concierge';
import ConciergeController from 'sly/controllers/ConciergeController';

export default class ConciergeContainer extends Component {
  render() {
    const { community, ...props } = this.props;
    return (
      <ConciergeController community={community}>
        {({
          concierge,
          submitExpressConversion,
          submitRegularConversion,
          submitAdvancedInfo,
          launchCalendly,
          close
        }) => (
          <Concierge
            concierge={concierge}
            community={community}
            submitExpressConversion={submitExpressConversion}
            submitRegularConversion={submitRegularConversion}
            submitAdvancedInfo={submitAdvancedInfo}
            launchCalendly={launchCalendly}
            close={close}
            {...props}
          />
        )}
      </ConciergeController>
    );
  }
};
