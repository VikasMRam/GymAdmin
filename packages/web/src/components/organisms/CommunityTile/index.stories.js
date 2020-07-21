import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunityTile from 'sly/web/components/organisms/CommunityTile';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const note = 'Location is great. This community is near my hosue, I can visit my mom in just a 20 minute drive. Big mood.';
const defaultProps = {
  onFavouriteClick: action('onFavouriteClick'),
  onUnfavouriteClick: action('onUnfavouriteClick'),
  onEditNoteClick: action('onEditNoteClick'),
  onAddNoteClick: action('onAddNoteClick'),
  onSlideChange: action('onSlideChange'),
};
const actionButtons = [
  {
    text: 'Ask Question',
    onClick: action('onAskQuestionClick'),
  },
];
const RhodaGoldmanPlazaPlus = { ...RhodaGoldmanPlaza, plusCategory: 'Plus' };

storiesOf('Organisms|CommunityTile', module)
  .add('default', () => <div style={{ maxWidth: '380px' }} ><CommunityTile community={RhodaGoldmanPlaza} {...defaultProps} /></div>)
  .add('default and plusCategory community', () => <div style={{ maxWidth: '380px' }} ><CommunityTile community={RhodaGoldmanPlazaPlus} {...defaultProps} /></div>)
  .add('with noGallery', () => <div style={{ maxWidth: '380px' }} ><CommunityTile community={RhodaGoldmanPlaza} noGallery {...defaultProps} /></div>)
  .add('with column layout', () => <CommunityTile layout="column" community={RhodaGoldmanPlaza} noGallery {...defaultProps} />)
  .add('with column layout and plusCategory community', () => <CommunityTile layout="column" community={RhodaGoldmanPlazaPlus} noGallery {...defaultProps} />)
  .add('with column layout and showDescription', () => <CommunityTile layout="column" community={RhodaGoldmanPlaza} noGallery showDescription {...defaultProps} />)
  .add('with actionButtons', () => <div style={{ maxWidth: '380px' }} ><CommunityTile canFavourite community={RhodaGoldmanPlaza} actionButtons={actionButtons} {...defaultProps} /></div>)
  .add('with actionButtons and note', () => <div style={{ maxWidth: '380px' }} ><CommunityTile canFavourite note={note} community={RhodaGoldmanPlaza} actionButtons={actionButtons} {...defaultProps} /></div>)
  .add('with actionButtons and add note', () => <div style={{ maxWidth: '380px' }} ><CommunityTile addNote canFavourite community={RhodaGoldmanPlaza} actionButtons={actionButtons} {...defaultProps} /></div>)
  .add('with actionButtons, isFavourite and add note', () => <div style={{ maxWidth: '380px' }} ><CommunityTile addNote canFavourite isFavourite community={RhodaGoldmanPlaza} actionButtons={actionButtons} {...defaultProps} /></div>)
  .add('small size', () => <div style={{ maxWidth: '288px' }} ><CommunityTile community={RhodaGoldmanPlaza} /></div>)
  .add('small size and with actionButtons', () => <div style={{ maxWidth: '288px' }} ><CommunityTile canFavourite community={RhodaGoldmanPlaza} actionButtons={actionButtons} {...defaultProps} /></div>)
  .add('small size, with actionButtons and note', () => <div style={{ maxWidth: '288px' }} ><CommunityTile canFavourite note={note} community={RhodaGoldmanPlaza} actionButtons={actionButtons} {...defaultProps} /></div>)
  .add('small size, with actionButtons and add note', () => <div style={{ maxWidth: '288px' }} ><CommunityTile addNote canFavourite community={RhodaGoldmanPlaza} actionButtons={actionButtons} {...defaultProps} /></div>)
  .add('small size, with actionButtons, isFavourite and add note', () => <div style={{ maxWidth: '288px' }} ><CommunityTile addNote isFavourite canFavourite community={RhodaGoldmanPlaza} actionButtons={actionButtons} {...defaultProps} /></div>);
