import React, { Component } from 'react';

import Concierge from 'sly/components/organisms/Concierge';
import ConciergeController from 'sly/controllers/ConciergeController';

export default class ConciergeContainer extends Component {
  render() {
    const { community, ...props } = this.props;
    return (
      <ConciergeController community={community}>
        {({ concierge }) =>
          <Concierge
            concierge={concierge}
            community={community}
            {...props}
          />
        }
      </ConciergeController>
    );
  }
};
