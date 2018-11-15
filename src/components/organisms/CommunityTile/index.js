import React from 'react';
import styled, { css } from 'styled-components';
import { oneOf } from 'prop-types';
import { switchProp } from 'styled-tools';


import { size } from 'sly/components/themes';
import { community as communityPropType } from 'sly/propTypes/community';
import CommunityInfo from 'sly/components/molecules/CommunityInfo/index';
import { Image } from 'sly/components/atoms/index';

const Wrapper = styled.div`
  ${switchProp('layout', {
    contained: css`
      position: relative;
    `,
  })};
`;

const StyledImage = styled(Image)`
  ${switchProp('layout', {
    mobile: css`
      > img {
        border-radius: ${size('spacing.small')};
      }
      margin-bottom: ${size('spacing.large')};
`,
    contained: css`
      > img {
        border-radius: ${size('spacing.small')};
      }
`,
  })};
`;

const StyledCommunityInfo = styled(CommunityInfo)`
  ${switchProp('layout', {
    contained: css`
      position: absolute;
      bottom: ${size('spacing.large')};
      padding-left: ${size('spacing.large')};
`,
  })};
`;

const CommunityTile = ({ community, layout }) => {
  const aspectRatio = '3:2';
  let palette = null;
  switch (layout) {
    case 'contained': {
      palette = 'white';
      break;
    }
    default: {
      break;
    }
  }
  return (
    <Wrapper layout={layout} backgroundImage={community.mainImage}>
      <StyledImage layout={layout} aspectRatio={aspectRatio} src={community.mainImage} />
      <StyledCommunityInfo layout={layout} community={community} palette={palette} />
    </Wrapper>
  );
};

CommunityTile.propTypes = {
  community: communityPropType,
  layout: oneOf(['mobile', 'contained']),
};

CommunityTile.defaultProps = {
  layout: 'mobile',
};

export default CommunityTile;
