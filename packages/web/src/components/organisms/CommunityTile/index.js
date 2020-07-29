import React from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, bool, string, func, number, shape, oneOf, object } from 'prop-types';
import { ifProp } from 'styled-tools';

import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { size, getKey, palette } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import cursor from 'sly/web/components/helpers/cursor';
import borderRadius from 'sly/web/components/helpers/borderRadius';
import border from 'sly/web/components/helpers/border';
import { COLUMN_LAYOUT_IMAGE_WIDTH } from 'sly/web/constants/communityTile';
import { Button, Hr, Span } from 'sly/web/components/atoms';
import { community as communityPropType } from 'sly/common/propTypes/community';
import CommunityInfo from 'sly/web/components/molecules/CommunityInfo';
import MediaGallery from 'sly/web/components/molecules/MediaGallery';
import IconButton from 'sly/web/components/molecules/IconButton';
import PlusBadge from 'sly/web/components/molecules/PlusBadge';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';

const communityDefaultImages = {
  'up to 20 Beds': assetPath('vectors/Board_and_Care.svg'),
  '20 - 51 Beds': assetPath('vectors/Medium_Assisted_Living.svg'),
  '51 +': assetPath('vectors/Large_Assisted_Living.svg'),
};

const getImageSize = ({ imageSize }) => imageSize ? getKey(`sizes.tile.${imageSize}`).width : COLUMN_LAYOUT_IMAGE_WIDTH;

const FullWidthButton = fullWidth(Button);
FullWidthButton.displayName = 'FullWidthButton';
const CursorSpan = cursor(Span);
CursorSpan.displayName = 'CursorSpan';

const PaddedCommunityInfo = pad(CommunityInfo);
PaddedCommunityInfo.displayName = 'PaddedCommunityInfo';

const AddNote = styled(CursorSpan)`
  display: block;
  text-align: center;
`;
AddNote.displayName = 'AddNote';

const StyledMediaGallery = styled(MediaGallery)`
  background: none;
  img {
    border-radius: ${size('spacing.small')};
  }
`;

const StyledImage = styled(borderRadius(ResponsiveImage))`
  img {
    border-radius: ${size('spacing.small')};
  }

  Button {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const TopRightWrapper = styled.span`
  right: ${size('spacing.large')};
  top: ${size('spacing.large')};
  position: absolute;
  z-index: 1;
`;

const Details = styled.div`
  padding: ${size('spacing.large')} ${size('spacing.regular')};
  ${ifProp({ layout: 'column' }, css`
    padding-left: ${size('spacing.large')};
    // required for text clipping
    overflow: hidden;
  `)}
`;

const Wrapper = borderRadius(border(styled.div`
  padding: ${size('spacing.regular')};
  // no column layout support below tablet
  ${ifProp({ layout: 'column' }, css`
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      display: grid;
      grid-template-columns: ${getImageSize} auto;
    }
  `)}

  &:hover {
    Button {
      display: initial;
    }
  }
`, 'regular', 'grey', 'stroke'));

const MainWrapper = styled.article`
  position: relative;
  background-color: ${ifProp('plusCategory', palette('primary', 'background'), palette('white', 'base'))};
`;

const buildActionButtons = actionButtons => actionButtons.map(({ text, ghost, onClick }) => (
  <FullWidthButton onClick={onClick} ghost={ghost} key={text}>
    {text}
  </FullWidthButton>
));

const CommunityTile = ({
  community, actionButtons, note, addNote, onEditNoteClick, onAddNoteClick, isFavourite,
  onFavouriteClick, onUnfavouriteClick, onSlideChange, currentSlide, className, noGallery,
  layout, showFloorPlan, palette, showDescription, imageSize, showSeeMoreButtonOnHover,
  canFavourite, lazyLoadImage, event,
}) => {
  const {
    name, gallery = {}, communitySize, plusCategory,
  } = community;
  const { images = [] } = gallery;
  const galleryImages = images.map((img, i) => ({ ...img, src: img.sd, alt: `${name} ${i + 1}` }));
  const icon = isFavourite ? 'favourite-dark' : 'favourite-empty';
  const iconPalette = isFavourite ? 'primary' : 'white';
  const onIconClick = isFavourite ? onUnfavouriteClick : onFavouriteClick;
  const hasImages = galleryImages.length > 0;
  // one image only, don't show gallery
  if (galleryImages.length < 2) {
    noGallery = true;
  }
  const placeholder = communityDefaultImages[communitySize || 'up to 20 Beds'];
  let imagePath;
  let imageSrc;
  if (!hasImages) {
    imageSrc = placeholder;
  } else {
    imagePath = galleryImages[0].path;
  }
  const topRightSection = canFavourite
    ? () => <IconButton transparent icon={icon} iconSize="body" palette={iconPalette} onClick={onIconClick} />
    : null;

  const CommunityInfoComponent = actionButtons.length ? PaddedCommunityInfo : CommunityInfo;
  const mediaSizes = getKey('imageFormats.searchResults').sizes;
  const loading = lazyLoadImage ? 'lazy' : 'auto';

  return (
    <MainWrapper className={className} plusCategory={plusCategory}>
      {plusCategory && <PlusBadge plusCategory={plusCategory} fullWidth />}
      <Wrapper layout={layout} imageSize={imageSize}>
        {!noGallery &&
          <StyledMediaGallery
            communityName={name}
            images={galleryImages}
            sizes={mediaSizes}
            topRightSection={topRightSection}
            onSlideChange={onSlideChange}
            currentSlide={currentSlide}
            layout={layout}
          />
        }
        {noGallery &&
          <>
            <StyledImage
              layout={layout}
              path={imagePath}
              src={imageSrc}
              placeholder={placeholder}
              sizes={mediaSizes}
              aspectRatio={layout === 'column' ? '4:3' : '16:9'}
              loading={loading}
            >
              {showSeeMoreButtonOnHover && <Button>See More Details</Button>}
            </StyledImage>
            {topRightSection && (
              <TopRightWrapper>
                {topRightSection()}
              </TopRightWrapper>
            )}
          </>
        }
        <Details layout={layout} padding="regular" hasImages={hasImages}>
          <CommunityInfoComponent
            palette={palette}
            community={community}
            showFloorPlan={showFloorPlan}
            showDescription={showDescription}
            event={event}
          />
          {buildActionButtons(actionButtons)}
          {(note || addNote) && <Hr />}
          {note && <Span size="caption">{note}</Span>}
          {note && <CursorSpan palette="primary" size="caption" onClick={onEditNoteClick}> Edit note</CursorSpan>}
          {!note && addNote && <AddNote palette="primary" size="caption" onClick={onAddNoteClick}>Add a note</AddNote>}
        </Details>
      </Wrapper>
    </MainWrapper>

  );
};

CommunityTile.propTypes = {
  community: communityPropType.isRequired,
  actionButtons: arrayOf(shape({
    text: string.isRequired,
    ghost: bool,
    onClick: func,
  })),
  onEditNoteClick: func,
  onAddNoteClick: func,
  note: string,
  addNote: bool,
  canFavourite: bool,
  isFavourite: bool,
  onFavouriteClick: func,
  onUnfavouriteClick: func,
  onSlideChange: func,
  currentSlide: number,
  className: string,
  noGallery: bool,
  showFloorPlan: bool,
  layout: oneOf(['column', 'row']),
  palette: palettePropType,
  showDescription: bool,
  showSeeMoreButtonOnHover: bool,
  imageSize: oneOf(Object.keys(getKey('sizes.tile'))),
  lazyLoadImage: bool.isRequired,
  event: object,
};

CommunityTile.defaultProps = {
  actionButtons: [],
  layout: 'row',
  lazyLoadImage: true,
};

export default CommunityTile;
