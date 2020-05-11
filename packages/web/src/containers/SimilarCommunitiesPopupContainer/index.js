import React, { PureComponent } from 'react';
import { func, object, string } from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { prefetch } from 'sly/services/api';
import { Heading } from 'sly/components/atoms';
import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';
import { size } from 'sly/components/themes';
import textAlign from 'sly/components/helpers/textAlign';
import SlyEvent from 'sly/services/helpers/events';

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
      community.similarProperties && (
        <>
          <StyledHeading>We found some Assisted Living communities you might like</StyledHeading>

          <SimilarCommunities
            communities={community.similarProperties}
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
