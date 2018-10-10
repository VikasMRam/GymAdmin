import React from 'react';
import styled, { css } from 'styled-components';
import { string, func } from 'prop-types';

import { size } from 'sly/components/themes';

import { Image, Block, Icon } from 'sly/components/atoms';

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
  width: ${size('tile.little.width')};
  height: ${size('tile.little.height')};
  margin-right: ${size('spacing.regular')};
  padding-top: unset;

  > img {
    border-radius: ${size('border.xxLarge')};
  }
`;
ImageWrapper.displayName = 'ImageWrapper';

const Note = styled.div`
  ${clamp};
  font-size: ${size('text.tiny')};
`;
Note.displayName = 'Note';

const StyledIcon = styled(Icon)`
  position: absolute;
  z-index: 1;
  top: ${size('spacing.regular')};
  margin-left: calc(${size('tile.little.width')} - ${size('icon.regular')}  - ${size('spacing.regular')});

  :hover {
    cursor: pointer;
  }
`;
StyledIcon.displayName = 'StyledIcon';

const SavedCommunityTile = ({
  image, name, note, onFavouriteClicked,
}) => (
  <Wrapper>
    <div>
      <StyledIcon icon="favourite-dark" size="regular" palette="primary" onClick={onFavouriteClicked} />
      <ImageWrapper src={image} aspectRatio="4:3" />
    </div>
    <div>
      <Block>{name}</Block>
      {note && <Note>{note}</Note>}
    </div>
  </Wrapper>
);

SavedCommunityTile.propTypes = {
  image: string.isRequired,
  name: string.isRequired,
  note: string,
  onFavouriteClicked: func,
};

export default SavedCommunityTile;
