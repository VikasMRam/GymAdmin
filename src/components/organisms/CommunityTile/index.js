import React from 'react';
import styled from 'styled-components';
import { arrayOf, bool, string, func } from 'prop-types';
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

const buildActionButtons = ({ actionButtons, onAskQuestionClick }) => actionButtons.map((action) => {
  if (action === 'ask-question') {
    return (
      <FullWidthButton onClick={onAskQuestionClick} key={action}>
        Ask a question
      </FullWidthButton>
    );
  }
  return null;
});

const CommunityTile = ({
  community, actionButtons, note, addNote, onAskQuestionClick, onEditNoteClick, onAddNoteClick, isFavourite,
  onFavouriteClick, onUnfavouriteClick, onSlideChange,
}) => {
  const { name, gallery } = community;
  const { images = [] } = gallery;
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
        <StyledCommunityInfo community={community} marginBottom={!!actionButtons.length} />
        {buildActionButtons({ actionButtons, onAskQuestionClick })}
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
  actionButtons: arrayOf(string),
  onAskQuestionClick: func,
  onEditNoteClick: func,
  onAddNoteClick: func,
  note: string,
  addNote: bool,
  isFavourite: bool,
  onFavouriteClick: func,
  onUnfavouriteClick: func,
  onSlideChange: func.isRequired,
};

CommunityTile.defaultProps = {
  actionButtons: [],
};

export default CommunityTile;
