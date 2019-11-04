import React, { PureComponent } from 'react';
import { func, object, string } from 'prop-types';
import styled from 'styled-components';

import { prefetch } from 'sly/services/newApi';
import { Heading } from 'sly/components/atoms';
import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';
import { size } from 'sly/components/themes';
import textAlign from 'sly/components/helpers/textAlign';

const communityStyle = { layout: 'row', imageSize: 'small', showDescription: false };

const StyledHeading = styled(textAlign(Heading))`
  margin-bottom: ${size('spacing.xLarge')};
`;

@prefetch('community', 'getCommunity', (req, { communitySlug }) => req({
  id: communitySlug,
  include: 'similar-communities',
}))
export default class SimilarCommunitiesPopupContainer extends PureComponent {
  static propTypes = {
    community: object,
    communitySlug: string,
    hideModal: func,
    sendEvent: func,
  };

  componentDidMount() {
    this.props.sendEvent('similar-communities-open', this.props.pathname);
  }

  componentWillUnmount() {
    this.props.sendEvent('similar-communities-close', this.props.pathname);
  }

  render() {
    const { community, hideModal, sendEvent } = this.props;

    return (
      community && community.similarProperties &&
      <>
        <StyledHeading>
          We found some Assisted Living communities you might like
        </StyledHeading>

        <SimilarCommunities
          communities={community.similarProperties}
          onCommunityClick={(index, to) => {
            sendEvent('similar-community-click', index.toString(), to);
            hideModal();
          }}
          communityStyle={communityStyle}
        />
      </>
    );
  }
}
