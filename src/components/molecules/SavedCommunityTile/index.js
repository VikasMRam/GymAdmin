import React from 'react';
import styled, { css } from 'styled-components';
import { string } from 'prop-types';

import { size } from 'sly/components/themes';

import { Image, Heading, Icon } from 'sly/components/atoms';

const clamp = css`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const ImageWrapper = styled(Image)`
  width: ${size('tile.small.width')};
  height: ${size('tile.small.height')};
  margin-right: ${size('spacing.regular')};
  padding-top: unset;

  > img {
    border-radius: ${size('border.xxLarge')};
  }
`;
ImageWrapper.displayName = 'ImageWrapper';

const Note = styled.div`
  ${clamp};
`;
Note.displayName = 'Note';

const StyledIcon = styled(Icon)`
  position: absolute;
  z-index: 1;
  top: ${size('spacing.regular')};
  margin-left: calc(${size('tile.small.width')} - ${size('icon.regular')}  - ${size('spacing.regular')});
`;
StyledIcon.displayName = 'StyledIcon';

const SavedCommunityTile = ({ image, name, note }) => (
  <Wrapper>
    <StyledIcon icon="favourite-dark" size="regular" palette="primary" />
    <ImageWrapper src={image} aspectRatio="4:3" />
    <div>
      <Heading size="subtitle">{name}</Heading>
      {note && <Note>{note}</Note>}
    </div>
  </Wrapper>
);

SavedCommunityTile.propTypes = {
  image: string.isRequired,
  name: string.isRequired,
  note: string,
};

export default SavedCommunityTile;
