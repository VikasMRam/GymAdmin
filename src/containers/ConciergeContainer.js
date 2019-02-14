import React, { Component } from 'react';

import Concierge from 'sly/components/organisms/Concierge';
import ConciergeController from 'sly/controllers/ConciergeController';

export default class ConciergeContainer extends Component {
  render() {
    const { community, pathName, queryParams, setQueryParams, ...props } = this.props;
    const communitySlug = community ? community.id : undefined;
    return (
      <ConciergeController pathName={pathName} communitySlug={communitySlug} queryParams={queryParams} setQueryParams={setQueryParams}>
        {({
          concierge,
          userDetails,
          submitExpressConversion,
          submitRegularConversion,
          gotoWhatNext,
          submitAdvancedInfo,
          close,
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
