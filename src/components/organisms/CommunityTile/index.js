import React from 'react';
import styled, { css } from 'styled-components';
import { oneOf } from 'prop-types';
import { switchProp } from 'styled-tools';


import { size } from 'sly/components/themes';
import { community as communityPropType } from 'sly/propTypes/community';
import CommunityInfo from 'sly/components/molecules/CommunityInfo/index';
import { Image } from 'sly/components/atoms/index';

const columnBackground = ({ backgroundImage }) => `url(${backgroundImage})`;
const Wrapper = styled.div`
  ${switchProp('layout', {
    fullHeight: css`
      height: 100%;
      position: relative;
      background-image: ${columnBackground};
      background-size: cover;
      background-position: center;
`,
    contained: css`
      position: relative;
    `,
  })};
`;

const StyledImageWrapper = styled.div`
  ${switchProp('layout', {
    fullHeight: css`
      display: none;
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
    fullHeight: css`
      display: none;
    `,
  })};
`;

const StyledCommunityInfo = styled(CommunityInfo)`
  ${switchProp('layout', {
    fullHeight: css`
      position: absolute;
      bottom: ${size('spacing.large')};
      left: ${size('spacing.large')};
`,
    contained: css`
      position: absolute;
      bottom: ${size('spacing.large')};
      padding-left: ${size('spacing.large')};
`,
  })};
`;

const CommunityTile = ({ community, layout }) => {
  let aspectRatio = '3:2';
  let palette = null;
  switch (layout) {
    case 'fullHeight': {
      aspectRatio = undefined;
      palette = 'white';
      break;
    }
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
      <StyledImageWrapper>
        <StyledImage layout={layout} aspectRatio={aspectRatio} src={community.mainImage} />
      </StyledImageWrapper>
      <StyledCommunityInfo layout={layout} community={community} palette={palette} />
    </Wrapper>
  );
};

CommunityTile.propTypes = {
  community: communityPropType,
  layout: oneOf(['mobile', 'fullHeight', 'contained']),
};

CommunityTile.defaultProps = {
  layout: 'mobile',
};

export default CommunityTile;
