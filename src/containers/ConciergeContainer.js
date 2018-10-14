import React, { Component } from 'react';

import Concierge from 'sly/components/organisms/Concierge';
import ConciergeController from 'sly/controllers/ConciergeController';

export default class ConciergeContainer extends Component {
  render() {
    const { community, modal, setModal, ...props } = this.props;
    return (
      <ConciergeController community={community} modal={modal} setModal={setModal}>
        {({
          concierge,
          userDetails,
          submitExpressConversion,
          submitRegularConversion,
          gotoWhatNext,
          submitAdvancedInfo,
          close
        }) => (

          <Concierge
            concierge={concierge}
            community={community}
            userDetails={userDetails}
            gotoWhatNext={gotoWhatNext}
            submitExpressConversion={submitExpressConversion}
            submitRegularConversion={submitRegularConversion}
            submitAdvancedInfo={submitAdvancedInfo}
            close={close}
            {...props}
          />
        )}
      </ConciergeController>
    );
  }
};
