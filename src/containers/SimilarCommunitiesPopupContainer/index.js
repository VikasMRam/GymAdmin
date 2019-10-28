import React, { PureComponent } from 'react';
import { func, object, string } from 'prop-types';

import SimilarCommunities from 'sly/components/organisms/SimilarCommunities/index';
import SlyEvent from 'sly/services/helpers/events';
import { prefetch } from 'sly/services/newApi';


const communityStyle = { layout: 'row', imageSize: 'small', showDescription: false };

@prefetch('community', 'getCommunity', (req, { communitySlug })  => req({
  id: communitySlug,
  include: 'similar-communities',
}))

export default class  SimilarCommunitiesPopupContainer extends PureComponent {
  static propTypes = {
    community: object,
    communitySlug: string,
    hideModal: func,
  };

  handleSimilarCommunitiesModalClick = (index, to, hideModal) => {
    const event = {
      action: 'click', category: 'similarCommunity', label: index.toString(), value: to,
    };

    SlyEvent.getInstance().sendEvent(event);
    hideModal();
  };

  render() {
    const { community, hideModal } = this.props;

    return (
      community && <SimilarCommunities
        communities={community.similarProperties}
        onCommunityClick={(index, to) => this.handleSimilarCommunitiesModalClick(index, to, hideModal)}
        communityStyle={communityStyle}
      />
    );
  }
}
