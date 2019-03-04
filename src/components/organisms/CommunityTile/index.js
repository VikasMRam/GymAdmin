import React from 'react';
import styled from 'styled-components';
import { oneOf, bool, string, func } from 'prop-types';
import { ifProp, switchProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import fullWidth from 'sly/components/helpers/fullWidth';
import cursor from 'sly/components/helpers/cursor';
import { Box, Button, Hr, Span } from 'sly/components/atoms';
import { community as communityPropType } from 'sly/propTypes/community';
import CommunityInfo from 'sly/components/molecules/CommunityInfo';
import MediaGallery from 'sly/components/molecules/MediaGallery';
import IconButton from 'sly/components/molecules/IconButton';

const FullWidthButton = fullWidth(Button);
const CursorSpan = cursor(Span);

const StyledCommunityInfo = styled(CommunityInfo)`
  margin-bottom: ${ifProp('marginBottom', size('spacing.xLarge'), 0)};
`;

const AddNote = styled(CursorSpan)`
  display: block;
  text-align: center;
`;

const buildActionButtons = ({ actions, onAskQuestionClick }) => {
  const buttons = actions.map((action) => {
    if (action === 'ask-question') {
      return (
        <FullWidthButton onClick={onAskQuestionClick}>
          Ask a question
        </FullWidthButton>
      );
    }
    return null;
  });
  return buttons;
};

const CommunityTile = ({
  community, actions, note, addNote, onAskQuestionClick, onEditNoteClick, onAddNoteClick, isFavourite,
  onFavouriteClick, onUnfavouriteClick, onSlideChange,
}) => {
  const { name, gallery } = community;
  const { images } = gallery;
  const galleryImages = images.map((img, i) => ({ ...img, src: img.sd, alt: `${name} ${i + 1}` }));
  const icon = isFavourite ? 'favourite-dark' : 'favourite-empty';
  const iconPalette = isFavourite ? 'secondary' : 'white';
  const onIconClick = isFavourite ? onUnfavouriteClick : onFavouriteClick;

  const topRightSection = () => (
    <IconButton transparent icon={icon} iconSize="regular" palette={iconPalette} onClick={onIconClick} />
  );

  return (
    <div>
      <MediaGallery
        communityName={name}
        images={galleryImages}
        topRightSection={topRightSection}
        onSlideChange={onSlideChange}
      />
      <Box>
        <StyledCommunityInfo community={community} marginBottom={!!actions.length} />
        {buildActionButtons({ actions, onAskQuestionClick })}
        {(note || addNote) && <Hr />}
        {note && <Span size="caption">{note}</Span>}
        {note && <CursorSpan palette="primary" size="caption" onClick={onEditNoteClick}> Edit note</CursorSpan>}
        {!note && addNote && <AddNote palette="primary" size="caption" onClick={onAddNoteClick}>Add a note</AddNote>}
      </Box>
    </div>
  );
};

CommunityTile.propTypes = {
  community: communityPropType,
  actions: oneOf(['ask-question']),
  onAskQuestionClick: func,
  onEditNoteClick: func,
  onAddNoteClick: func,
  note: string,
  addNote: bool,
  isFavourite: bool,
  onFavouriteClick: func,
  onUnfavouriteClick: func,
  onSlideChange: func,
};

CommunityTile.defaultProps = {
  actions: [],
};

export default CommunityTile;
