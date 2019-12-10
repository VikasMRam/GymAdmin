import React, { Component } from 'react';
import { Lazy } from 'react-lazy';
import loadable from '@loadable/component';
import { withRouter } from 'react-router';

import { prefetch } from 'sly/services/newApi';
import { community as communityPropType } from 'sly/propTypes/community';

const CommunityMap = loadable(() =>
  import(/* webpackChunkName: "chunkCommunityMap" */ 'sly/components/organisms/CommunityMap'),
);

class LazyCommunityMapContainer extends Component {
  state = { mounted: false };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    const { community } = this.props;

    return this.state.mounted ? (
      <CommunityMap community={community} similarProperties={community.similarProperties} />
    ) : <div />;
  }
}
LazyCommunityMapContainer.typeHydrationId = 'LazyCommunityMapContainer';
LazyCommunityMapContainer.propTypes = {
  community: communityPropType,
};

const withCommunity = prefetch('community', 'getCommunity', (req, { match }) =>
  req({
    id: match.params.communitySlug,
    include: 'similar-communities,questions,agents',
  }),
);
export default withRouter(withCommunity(LazyCommunityMapContainer));
