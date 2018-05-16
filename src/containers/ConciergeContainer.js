import React, { Component } from 'react';

import Concierge from 'sly/components/organisms/Concierge';
import ConciergeController from 'sly/controllers/ConciergeController';

export default class ConciergeContainer extends Component {
  render() {
    const { community, ...props } = this.props;
    return (
      <ConciergeController community={community}>
        {({ next, close, concierge }) =>
          <Concierge
            onClose={close}
            next={next}
            concierge={concierge}
            community={community}
            {...props}
          />
        }
      </ConciergeController>
    );
  }
};
