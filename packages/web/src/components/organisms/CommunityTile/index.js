import React from 'react';
import styled from 'styled-components';
import { arrayOf, bool, string, func, number, shape, oneOf, object } from 'prop-types';
import { ifProp } from 'styled-tools';

import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { size, getKey } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import { upTo } from 'sly/common/components/helpers';
import borderRadius from 'sly/web/components/helpers/borderRadius';
import { COLUMN_LAYOUT_IMAGE_WIDTH } from 'sly/web/constants/communityTile';
import { Button, Hr, Block, Grid } from 'sly/common/components/atoms';
import { community as communityPropType } from 'sly/common/propTypes/community';
import CommunityInfo from 'sly/web/components/molecules/CommunityInfo';
import MediaGallery from 'sly/web/components/molecules/MediaGallery';
import IconButton from 'sly/common/components/molecules/IconButton';
import PlusBadge from 'sly/web/components/molecules/PlusBadge';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';

const communityDefaultImages = {
  'up to 20 Beds': assetPath('vectors/Board_and_Care.svg'),
  '20 - 51 Beds': assetPath('vectors/Medium_Assisted_Living.svg'),
  '51 +': assetPath('vectors/Large_Assisted_Living.svg'),
};

const getImageSize = ({ imageSize }) => imageSize ? getKey(`sizes.tile.${imageSize}`).width : COLUMN_LAYOUT_IMAGE_WIDTH;

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

const Wrapper = styled(Grid)`
  // no column layout support below tablet
  ${upTo('tablet', 'grid-template-columns: auto;')}
  ${ifProp({ layout: 'row' }, 'grid-template-columns: auto;')}

  &:hover {
    Button {
      display: initial;
    }
  }
`;

const buildActionButtons = actionButtons => actionButtons.map(({ text, ghost, onClick }) => (
  <Button width="100%" onClick={onClick} ghost={ghost} key={text}>
    {text}
  </Button>
));

const CommunityTile = ({
  community, actionButtons, note, addNote, onEditNoteClick, onAddNoteClick, isFavourite,
  onFavouriteClick, onUnfavouriteClick, onSlideChange, currentSlide, className, noGallery,
  layout, showFloorPlan, palette, imageSize, showSeeMoreButtonOnHover,
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

  const mediaSizes = getKey('imageFormats.searchResults').sizes;
  const loading = lazyLoadImage ? 'lazy' : 'auto';

  return (
    <Block
      as="article"
      position="relative"
      className={className}
      background={plusCategory ? 'primary.background' : 'white.base'}
    >
      {plusCategory && <PlusBadge plusCategory={plusCategory} fullWidth />}
      <Wrapper
        layout={layout}
        borderRadius="regular"
        border="regular"
        borderPalette="grey.stroke"
        gap="large"
        dimensions={[getImageSize({ imageSize }), 'auto']}
      >
        {!noGallery &&
          <MediaGallery
            images={galleryImages}
            sizes={mediaSizes}
            topRightSection={topRightSection}
            onSlideChange={onSlideChange}
            currentSlide={currentSlide}
            borderRadius="regular"
            snap={layout === 'row' ? 'bottom' : undefined}
            transparent
          />
        }
        {noGallery &&
          <div>
            <StyledImage
              layout={layout}
              path={imagePath}
              src={imageSrc}
              placeholder={placeholder}
              sizes={mediaSizes}
              aspectRatio={layout === 'column' ? '4:3' : '16:9'}
              snap={layout === 'row' ? 'bottom' : undefined}
              loading={loading}
            >
              {showSeeMoreButtonOnHover && <Button>See More Details</Button>}
            </StyledImage>
            {topRightSection && (
              <TopRightWrapper>
                {topRightSection()}
              </TopRightWrapper>
            )}
          </div>
        }
        <Block padding={layout === 'row' ? ['0', 'large', 'large', 'large'] : 'large'}>
          <CommunityInfo
            palette={palette}
            community={community}
            showFloorPlan={showFloorPlan}
            event={event}
            priceTextSize={layout === 'row' ? 'body' : undefined}
            pad={actionButtons.length ? 'large' : undefined}
            swapRatingPrice={layout === 'row'}
          />
          {buildActionButtons(actionButtons)}
          {(note || addNote) && <Hr />}
          {note &&
            <>
              <Block display="inline" size="caption" marginRight="tiny">{note}</Block>
              <Button
                transparent
                padding="0"
                palette="primary"
                size="caption"
                onClick={onEditNoteClick}
              >
                Edit note
              </Button>
            </>
          }
          {!note && addNote &&
            <Block
              textAlign="center"
              palette="primary"
              size="caption"
              onClick={onAddNoteClick}
            >
              Add a note
            </Block>
          }
        </Block>
      </Wrapper>
    </Block>
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
