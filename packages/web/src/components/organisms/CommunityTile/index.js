import React from 'react';
import { arrayOf, bool, string, func, number, shape, oneOf, object } from 'prop-types';

import { size, getKey } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import { COLUMN_LAYOUT_IMAGE_WIDTH, COLUMN_LAYOUT_IMAGE_WIDTH_MEDIUM, COLUMN_LAYOUT_IMAGE_WIDTH_SMALL } from 'sly/web/constants/communityTile';
import { Button, Hr, Block, Grid, Image, space, sx } from 'sly/common/system';
import { community as communityPropType } from 'sly/common/propTypes/community';
import CommunityInfo from 'sly/web/components/molecules/CommunityInfo';
import MediaGallery from 'sly/web/components/molecules/MediaGallery';
import IconButton from 'sly/common/components/molecules/IconButton';
import PlusBadge from 'sly/web/components/molecules/PlusBadge';

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
  onFavouriteClick, onUnfavouriteClick, onSlideChange, currentSlide, noGallery,
  layout, showFloorPlan, canFavourite, lazyLoadImage, event, type, imageAspectRatio, imageMargin, index, ...props
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
  const spacing = type === 'map' ? 'xs' : 'l';
  imageAspectRatio = type === 'map' ? '1:1' : imageAspectRatio;


  imageMargin = layout === 'column' ? `${imageMargin || 0} ${spacing} ${imageMargin || 0} ${imageMargin || 0}` : null;
  if (type === 'map') {
    imageMargin = spacing;
  }
  const imageSnap = imageMargin && type !== 'map' ? 'right' : null;


  return (
    <Block
      as="article"
      background={plusCategory ? 'primary.background' : 'white.base'}
      {...props}
    >
      {plusCategory && <PlusBadge plusCategory={plusCategory} fullWidth />}
      <Grid
        flexDirection={layout}
        borderRadius="xxs"
        border="s"
        borderColor="slate.lighter-90"
        // dimensions={[type === 'list' ? COLUMN_LAYOUT_IMAGE_WIDTH : COLUMN_LAYOUT_IMAGE_WIDTH_SMALL, 'auto']}
        sx$laptop={type === 'list' ? null : {
          gridTemplateColumns: `${COLUMN_LAYOUT_IMAGE_WIDTH_SMALL} auto !important`,
          gridGap: 'xs',
        }}

        sx$tablet={type === 'list' ?
        {
          gridTemplateColumns: `${COLUMN_LAYOUT_IMAGE_WIDTH} auto`,
          gridGap: '0px',
        }
        : {
          gridTemplateColumns: `${COLUMN_LAYOUT_IMAGE_WIDTH_MEDIUM} auto`,
          gridGap: 'xs',
        }}
        // no column layout support below tablet
        sx={type === 'list' ? {
          gridTemplateColumns: 'auto',
          gridGap: 'm',
        } : {
          gridTemplateColumns: `${COLUMN_LAYOUT_IMAGE_WIDTH_SMALL} auto`,
          gridGap: 'xs',
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
            snap={layout === 'row' ? 'bottom' : imageSnap}
            transparent
          />
        }
        {noGallery &&
          <Image
            flexDirection={layout}
            path={imagePath}
            src={imageSrc}
            placeholder={placeholder}
            sizes={mediaSizes}
            aspectRatio={imageAspectRatio}

            margin={type === 'map' ? imageMargin : 0}
            snap={layout === 'row' ? 'bottom' : imageSnap}
            loading={loading}
            borderRadius="xxs"
            borderBottomLeftRadius={type === 'map' ? null : '0px !important'}
            borderBottomRightRadius={type === 'map' ? null : '0px !important'}
            sx$tablet={{
              borderBottomLeftRadius: sx`${space('xxs')}!important`,
              borderTopRightRadius: type === 'map' ? null : '0px !important',
              margin: imageMargin,
            }}
            // upToTablet={type === 'map' ? null : {
            //   borderRadius: size('spacing.small'),
            //   borderBottomLeftRadius: 0,
            //   borderBottomRightRadius: 0,
            //   margin: 0,
            // }}
          >
            {topRightSection &&
              <Block position="absolute" top="regular" right="regular" zIndex={1}>
                {topRightSection()}
              </Block>
            }
          </Image>
        }
        <Block
          overflow="hidden"

          // eslint-disable-next-line no-nested-ternary
          sx={type === 'map' ?
            {
              padding: spacing,
              paddingTop: 'xs',
            } : layout === 'row' ?
            {
            padding: `xs ${spacing} ${spacing} ${spacing}`,
            } :
            { padding: `m ${spacing}` }
          }
          sx$tablet={{
            padding: layout === 'row' ? `xs ${spacing} ${spacing} ${spacing}`  : `m ${spacing}`,
          }}
        >
          <CommunityInfo
            community={community}
            showFloorPlan={showFloorPlan}
            event={event}
            type={type}
            priceTextSize={layout === 'row' ? 'body-m' : undefined}
            pad={actionButtons.length ? 'm' : undefined}
            swapRatingPrice={layout === 'row'}
            index={index}
          />
          {buildActionButtons(actionButtons)}
          {(note || addNote) && <Hr />}
          {note &&
            <>
              <Block
                display="inline"
                size="body-s"
                marginRight="xxxs"
                testID="Note"
              >
                {note}
              </Block>
              <Button
                transparent
                padding="0"
                color="primary"
                size="body-s"
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
              color="primary"
              size="body-s"
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
  imageMargin: string,
  index: number,
};

CommunityTile.defaultProps = {
  actionButtons: [],
  layout: 'row',
  type: 'list',
  lazyLoadImage: true,
  position: 'relative',
  borderRadius: 'xxs',
  imageAspectRatio: '3:2',
};

export default CommunityTile;
