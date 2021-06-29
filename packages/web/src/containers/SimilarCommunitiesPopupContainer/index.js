import React, { PureComponent } from 'react';
import { func, object, string } from 'prop-types';
import styled from 'styled-components';

import { withRouter } from 'react-router';
import { size } from 'sly/common/components/themes';
import { prefetch } from 'sly/web/services/api';
import { Heading } from 'sly/web/components/atoms';
import SimilarCommunities from 'sly/web/components/organisms/SimilarCommunities';
import SlyEvent from 'sly/web/services/helpers/events';
import { textAlign } from 'sly/web/components/helpers/text';

const communityStyle = { layout: 'row', imageSize: 'small', showDescription: false };

const StyledHeading = styled(textAlign(Heading))`
  margin-bottom: ${size('spacing.xLarge')};
`;

const sendEvent = (action, label, value = '') =>
  SlyEvent.getInstance().sendEvent({
    category: 'exit-intent',
    action,
    label,
    value,
  });

@withRouter
@prefetch('community', 'getCommunity', (req, { communitySlug }) =>
  req({
    id: communitySlug,
    include: 'similar-communities',
  })
)
export default class SimilarCommunitiesPopupContainer extends PureComponent {
  static propTypes = {
    community: object,
    communitySlug: string,
    hideModal: func,
    location: object,
  };

  componentDidMount() {
    sendEvent('similar-communities-open', this.props.location.pathname);
  }

  componentWillUnmount() {
    sendEvent('similar-communities-close', this.props.location.pathname);
  }

  render() {
    const { community, hideModal } = this.props;

    return (
      community &&
      community.similarCommunities?.similar && (
        <>
          <StyledHeading>We found some Assisted Living communities you might like</StyledHeading>

          <SimilarCommunities
            communities={community.similarCommunities?.similar}
            onCommunityClick={() => hideModal()}
            communityStyle={communityStyle}
            getEvent={(community, index) => ({
              category: 'exit-intent',
              action: 'similar-community-click',
              label: index,
              value: community.id,
            })}
          />
        </>
      )
    );
  }
}
