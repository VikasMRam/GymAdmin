import React from 'react';
import { arrayOf, bool, string, func, number, shape, oneOf, object } from 'prop-types';

import { size, getKey } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import { COLUMN_LAYOUT_IMAGE_WIDTH, COLUMN_LAYOUT_IMAGE_WIDTH_SMALL } from 'sly/web/constants/communityTile';
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

const buildActionButtons = actionButtons => actionButtons.map(({ text, ghost, onClick }) => (
  <Button testID="ActionButton" width="100%" onClick={onClick} ghost={ghost} key={text}>
    {text}
  </Button>
));

const CommunityTile = ({
  community, actionButtons, note, addNote, onEditNoteClick, onAddNoteClick, isFavourite,
  onFavouriteClick, onUnfavouriteClick, onSlideChange, currentSlide, className, noGallery,
  layout, showFloorPlan, canFavourite, lazyLoadImage, event, type, imageAspectRatio, ...props
}) => {
  const {
    name, gallery, communitySize, plusCategory,
  } = community;
  let images = [];
  if (gallery) {
    ({ images = [] } = gallery);
  }
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
  const spacing = type === 'map' ? 'regular' : 'large';
  imageAspectRatio = type === 'map' ? '1:1' : imageAspectRatio;

  return (
    <Block
      as="article"
      className={className}
      background={plusCategory ? 'primary.background' : 'white.base'}
      {...props}
    >
      {plusCategory && <PlusBadge plusCategory={plusCategory} fullWidth />}
      <Grid
        flow={layout}
        borderRadius="small"
        border="regular"
        borderPalette="grey.stroke"
        gap={type === 'list' ? 'large' : 'regular'}
        dimensions={[type === 'list' ? COLUMN_LAYOUT_IMAGE_WIDTH : COLUMN_LAYOUT_IMAGE_WIDTH_SMALL, 'auto']}
        upToLaptop={type === 'list' ? null : {
          gridTemplateColumns: `${COLUMN_LAYOUT_IMAGE_WIDTH} auto!important`,
          gridGap: `${getKey('sizes.spacing.large')}!important`,
        }}
        // no column layout support below tablet
        upToTablet={type === 'list' ? {
          gridTemplateColumns: 'auto!important',
        } : {
          gridTemplateColumns: `${COLUMN_LAYOUT_IMAGE_WIDTH_SMALL} auto!important`,
          gridGap: `${getKey('sizes.spacing.regular')}!important`,
        }}
      >
        {!noGallery &&
          <MediaGallery
            images={galleryImages}
            sizes={mediaSizes}
            topRightSection={topRightSection}
            onSlideChange={onSlideChange}
            currentSlide={currentSlide}
            borderRadius="small"
            snap={layout === 'row' ? 'bottom' : null}
            transparent
          />
        }
        {noGallery &&
          <ResponsiveImage
            layout={layout}
            path={imagePath}
            src={imageSrc}
            placeholder={placeholder}
            sizes={mediaSizes}
            aspectRatio={imageAspectRatio}
            borderRadius="small"
            margin={layout === 'column' ? spacing : null}
            snap={layout === 'row' ? 'bottom' : null}
            loading={loading}
            upToTablet={type === 'map' ? null : {
              borderRadius: size('spacing.small'),
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              margin: 0,
            }}
          >
            {topRightSection &&
              <Block position="absolute" top="regular" right="regular" zIndex={1}>
                {topRightSection()}
              </Block>
            }
          </ResponsiveImage>
        }
        <Block
          overflow="hidden"
          padding={layout === 'row' ? ['0', spacing, spacing, spacing] : spacing}
          upToTablet={type === 'map' ? null : {
            padding: size('spacing', spacing),
            paddingTop: 0,
          }}
        >
          <CommunityInfo
            community={community}
            showFloorPlan={showFloorPlan}
            event={event}
            type={type}
            priceTextSize={layout === 'row' ? 'body' : undefined}
            pad={actionButtons.length ? 'large' : undefined}
            swapRatingPrice={layout === 'row'}
          />
          {buildActionButtons(actionButtons)}
          {(note || addNote) && <Hr />}
          {note &&
            <>
              <Block
                display="inline"
                size="caption"
                marginRight="tiny"
                testID="Note"
              >
                {note}
              </Block>
              <Button
                transparent
                padding="0"
                palette="primary"
                size="caption"
                testID="EditNote"
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
              testID="AddNote"
              onClick={onAddNoteClick}
            >
              Add a note
            </Block>
          }
        </Block>
      </Grid>
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
  layout: oneOf(['column', 'row']).isRequired,
  type: oneOf(['list', 'map']).isRequired,
  lazyLoadImage: bool.isRequired,
  event: object,
  imageAspectRatio: string.isRequired,
};

CommunityTile.defaultProps = {
  actionButtons: [],
  layout: 'row',
  type: 'list',
  lazyLoadImage: true,
  position: 'relative',
  borderRadius: 'small',
  imageAspectRatio: '3:2',
};

export default CommunityTile;
