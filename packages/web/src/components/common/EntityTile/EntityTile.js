import React from 'react';
import { arrayOf, bool, string, func, number, shape, oneOf, object } from 'prop-types';
import styled from 'styled-components';

import EntityInfo from './EntityInfo';

import { getKey } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import { COLUMN_LAYOUT_IMAGE_WIDTH, COLUMN_LAYOUT_IMAGE_WIDTH_MEDIUM, COLUMN_LAYOUT_IMAGE_WIDTH_SMALL } from 'sly/web/constants/communityTile';
import { Button, Hr, Block, Grid, Image, space, sx } from 'sly/common/system';
import IconButton from 'sly/common/components/molecules/IconButton';
import PlusBadge from 'sly/web/components/molecules/PlusBadge';
import Tag  from 'sly/web/components/atoms/Tag/newSystem';
import { entity as entityPropType } from 'sly/common/propTypes/entity';


const buildActionButtons = actionButtons => actionButtons.map(({ text, ghost, onClick }) => (
  <Button testID="ActionButton" width="100%" onClick={onClick} ghost={ghost} key={text}>
    {text}
  </Button>
));

const StyledIcon = styled(Block)`
  z-index: 10;
  top: 0.5rem;
  right: 0.5rem;
  transition: transform 250ms;
  &:hover {
    transform: scale(1.2);
  }
`;

const makeNewTags = (tags) => {
  const tagsMap = {
    PLUS: 'harvest.base',
    VERIFIED: 'green',
  };
  const newTags = [];
  tags.forEach((tag) => {
    if (tag === 'PLUS' || tag === 'VERIFIED') {
      newTags.push({
        name: tag,
        color: tagsMap[tag],
      });
    }
  });
  return newTags;
};

const EntityTile = ({
  entity, actionButtons, note, addNote, onEditNoteClick, onAddNoteClick, isFavourite, onFavouriteClick,
  onUnfavouriteClick, onSlideChange, currentSlide, layout, showFloorPlan, canFavourite, lazyLoadImage, event, type,
  imageAspectRatio, imageMargin, index, ...props
}) => {
  const {
    name, gallery, plusCategory, tags,
  } = entity;
  let images = [];
  if (gallery) {
    ({ images = [] } = gallery);
  }
  const galleryImages = images.map((img, i) => ({ ...img, src: img.sd, alt: `${name} ${i + 1}` }));
  const icon = isFavourite ? 'favourite-dark' : 'favourite-empty';
  const iconPalette = isFavourite ? 'primary' : 'white';
  const onIconClick = isFavourite ? onUnfavouriteClick : onFavouriteClick;
  const hasImages = galleryImages.length > 0;
  const placeholder = assetPath('vectors/Board_and_Care.svg');
  let imagePath;
  let imageSrc;
  if (!hasImages) {
    imageSrc = placeholder;
  } else {
    imagePath = galleryImages[0].path;
  }
  const topRightSection = canFavourite
    ? <IconButton transparent icon={icon} iconSize="body" palette={iconPalette} onClick={onIconClick} />
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
  const newTags = !!tags && !!tags.length ? makeNewTags(tags) : [];

  const tagSection = !!newTags && !!newTags.length && (
    <Block
      as="span"
      sx={{
        zIndex: '10',
        position: 'absolute',
        top: '0.5rem',
        left: '0.5rem',
        display: 'block',
      }}
    >
      {newTags.map(({ name, color }) => {
        return (
          <Tag
            color={color}
            background="white"
            key={name}
            marginRight="xs"
            sx={{
              zIndex: '10',
              position: 'absolute',
              top: '0.25rem',
              left: '0.25rem',
              display: 'block',
            }}
          >
            {name}
          </Tag>
        );
      })}
    </Block>
  );
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
        sx$laptop={type === 'list' ? null : {
          gridTemplateColumns: layout === 'row' ? 'none' : `${COLUMN_LAYOUT_IMAGE_WIDTH_SMALL} auto !important`,
          gridTemplateRows: layout === 'row' && 'auto 1fr',
          gridGap: 'xs',
        }}
        sx$tablet={type === 'list' ?
        {
          gridTemplateColumns: layout === 'row' ? 'none' : `${COLUMN_LAYOUT_IMAGE_WIDTH} auto`,
          gridTemplateRows: layout === 'row' && 'auto 1fr',
          gridGap: '0px',
        }
        : {
          gridTemplateColumns: layout === 'row' ? 'none' : `${COLUMN_LAYOUT_IMAGE_WIDTH_MEDIUM} auto`,
          gridTemplateRows: layout === 'row' && 'auto 1fr',
          gridGap: 'xs',
        }}
        // no column layout support below tablet
        sx={type === 'list' ? {
          gridTemplateColumns: 'auto',
          gridGap: 'm',
          height: '100%',
        } : {
          gridTemplateColumns: `${COLUMN_LAYOUT_IMAGE_WIDTH_SMALL} auto`,
          gridGap: 'xs',
        }}
      >
        <Block
          position="relative"
        >
          {tagSection}
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
          >
            {topRightSection &&
            <StyledIcon position="absolute" top="regular" right="regular" zIndex={10}>
              {topRightSection}
            </StyledIcon>
          }
          </Image>
        </Block>
        <Block
          overflow="hidden"
          display="flex"
          height="100%"
          flexDirection="column"
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
          <EntityInfo
            entity={entity}
            showFloorPlan={showFloorPlan}
            event={event}
            type={type}
            priceTextSize={layout === 'row' ? 'body-m' : undefined}
            pad={actionButtons.length ? 'm' : undefined}
            swapRatingPrice={layout === 'row'}
            index={index}
            height="100%"
          />
          {buildActionButtons(actionButtons)}
          {(note || addNote) && <Hr />}
          {note &&
            <>
              <Block
                textAlign="center"
                color="primary"
                size="body-s"
                testID="EditNote"
                marginTop="s"
                onClick={onEditNoteClick}
              >
                Edit note
              </Block>
            </>
          }
          {!note && addNote &&
            <Block
              textAlign="center"
              marginTop="s"
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

EntityTile.propTypes = {
  entity: entityPropType,
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
  showFloorPlan: bool,
  layout: oneOf(['column', 'row']).isRequired,
  type: oneOf(['list', 'map']).isRequired,
  lazyLoadImage: bool.isRequired,
  event: object,
  imageAspectRatio: string.isRequired,
  imageMargin: string,
  index: number,
};

EntityTile.defaultProps = {
  actionButtons: [],
  layout: 'row',
  type: 'list',
  lazyLoadImage: true,
  position: 'relative',
  borderRadius: 'xxs',
  imageAspectRatio: '3:2',
};

export default EntityTile;
