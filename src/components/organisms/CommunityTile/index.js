import React from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, bool, string, func, number, shape, oneOf } from 'prop-types';
import { ifProp, switchProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import fullWidth from 'sly/components/helpers/fullWidth';
import cursor from 'sly/components/helpers/cursor';
import { Box, Button, Hr, Span, Image } from 'sly/components/atoms';
import { community as communityPropType } from 'sly/propTypes/community';
import CommunityInfo from 'sly/components/molecules/CommunityInfo';
import MediaGallery from 'sly/components/molecules/MediaGallery';
import IconButton from 'sly/components/molecules/IconButton';

const FullWidthButton = fullWidth(Button);
FullWidthButton.displayName = 'FullWidthButton';
const CursorSpan = cursor(Span);
CursorSpan.displayName = 'CursorSpan';

const StyledCommunityInfo = styled(CommunityInfo)`
  margin-bottom: ${ifProp('marginBottom', size('spacing.xLarge'), 0)};
`;

const AddNote = styled(CursorSpan)`
  display: block;
  text-align: center;
`;
AddNote.displayName = 'AddNote';

const StyledMediaGallery = styled(MediaGallery)`
  background: none;
  img {
    border-top-left-radius: ${size('spacing.small')};
    border-top-right-radius: ${size('spacing.small')};
  }
  ${p => p.layout === 'column' && css`
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      img {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
  `}
`;

const StyledImage = styled(Image)`
  img {
    border-top-left-radius: ${size('spacing.small')};
    border-top-right-radius: ${size('spacing.small')};
  }
  ${p => p.layout === 'column' && css`
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      img {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
  `}
`;

const StyledBox = styled(Box)`
  ${p => p.hasImages && css`
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  `}
  ${p => p.layout === 'column' && css`
    // required for text clipping
    overflow: hidden;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  `}
`;

const Wrapper = styled.div`
  // no column layout support below tablet
  ${p => p.layout === 'column' && css`
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      display: grid;
      grid-template-columns: ${size('layout.col3')} auto;
    }
  `}
`;

const buildActionButtons = actionButtons => actionButtons.map(({ text, ghost, onClick }) => (
  <FullWidthButton onClick={onClick} ghost={ghost} key={text}>
    {text}
  </FullWidthButton>
));

const CommunityTile = ({
  community, actionButtons, note, addNote, onEditNoteClick, onAddNoteClick, isFavourite,
  onFavouriteClick, onUnfavouriteClick, onSlideChange, currentSlide, className, noGallery,
  layout, showFloorPlan,
}) => {
  const {
    name, gallery, imageUrl, mainImage,
  } = community;
  const { images = [] } = gallery;
  const galleryImages = images.map((img, i) => ({ ...img, src: img.sd, alt: `${name} ${i + 1}` }));
  const icon = isFavourite ? 'favourite-dark' : 'favourite-empty';
  const iconPalette = isFavourite ? 'secondary' : 'white';
  const onIconClick = isFavourite ? onUnfavouriteClick : onFavouriteClick;
  const hasImages = galleryImages.length > 0 || imageUrl || mainImage;

  const topRightSection = () => (
    <IconButton transparent icon={icon} iconSize="regular" palette={iconPalette} onClick={onIconClick} />
  );

  return (
    <Wrapper layout={layout} className={className}>
      {!noGallery &&
        <StyledMediaGallery
          communityName={name}
          images={galleryImages}
          topRightSection={topRightSection}
          onSlideChange={onSlideChange}
          currentSlide={currentSlide}
          layout={layout}
        />
      }
      {noGallery &&
        <StyledImage
          layout={layout}
          src={imageUrl || mainImage}
          aspectRatio={layout === 'column' ? '4:3' : '16:9'}
        />
      }
      <StyledBox layout={layout} padding="large" hasImages={hasImages}>
        <StyledCommunityInfo community={community} showFloorPlan={showFloorPlan} marginBottom={!!actionButtons.length} />
        {buildActionButtons(actionButtons)}
        {(note || addNote) && <Hr />}
        {note && <Span size="caption">{note}</Span>}
        {note && <CursorSpan palette="primary" size="caption" onClick={onEditNoteClick}> Edit note</CursorSpan>}
        {!note && addNote && <AddNote palette="primary" size="caption" onClick={onAddNoteClick}>Add a note</AddNote>}
      </StyledBox>
    </Wrapper>
  );
};

CommunityTile.propTypes = {
  community: communityPropType,
  actionButtons: arrayOf(shape({
    text: string.isRequired,
    ghost: bool,
    onClick: func,
  })),
  onEditNoteClick: func,
  onAddNoteClick: func,
  note: string,
  addNote: bool,
  isFavourite: bool,
  onFavouriteClick: func,
  onUnfavouriteClick: func,
  onSlideChange: func,
  currentSlide: number,
  className: string,
  noGallery: bool,
  showFloorPlan: bool,
  layout: oneOf(['column', 'row']),
};

CommunityTile.defaultProps = {
  actionButtons: [],
  layout: 'row',
};

export default CommunityTile;
