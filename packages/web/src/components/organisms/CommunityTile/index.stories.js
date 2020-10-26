import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunityTile from '.';

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
const RhodaGoldmanPlazaNoRating = { ...RhodaGoldmanPlaza, propRatings: { reviewsValue: 0 } };

storiesOf('Organisms|CommunityTile', module)
  .add('default', () => <div style={{ maxWidth: '380px' }} ><CommunityTile community={RhodaGoldmanPlaza} {...defaultProps} /></div>)
  .add('default and no rating', () => <div style={{ maxWidth: '380px' }} ><CommunityTile community={RhodaGoldmanPlazaNoRating} {...defaultProps} /></div>)
  .add('default and plusCategory community', () => <div style={{ maxWidth: '380px' }} ><CommunityTile community={RhodaGoldmanPlazaPlus} {...defaultProps} /></div>)
  .add('noGallery', () => <div style={{ maxWidth: '380px' }} ><CommunityTile community={RhodaGoldmanPlaza} noGallery {...defaultProps} /></div>)
  .add('noGallery, isFavourite and canFavourite', () => <div style={{ maxWidth: '380px' }} ><CommunityTile community={RhodaGoldmanPlaza} canFavourite isFavourite noGallery {...defaultProps} /></div>)
  .add('column layout', () => <CommunityTile layout="column" community={RhodaGoldmanPlaza} noGallery {...defaultProps} />)
  .add('column layout and no rating', () => <CommunityTile layout="column" community={RhodaGoldmanPlazaNoRating} noGallery {...defaultProps} />)
  .add('column layout and plusCategory community', () => <CommunityTile layout="column" community={RhodaGoldmanPlazaPlus} noGallery {...defaultProps} />)
  .add('column layout and showDescription', () => <CommunityTile layout="column" community={RhodaGoldmanPlaza} noGallery showDescription {...defaultProps} />)
  .add('actionButtons', () => <div style={{ maxWidth: '380px' }} ><CommunityTile canFavourite community={RhodaGoldmanPlaza} actionButtons={actionButtons} {...defaultProps} /></div>)
  .add('actionButtons and note', () => <div style={{ maxWidth: '380px' }} ><CommunityTile canFavourite note={note} community={RhodaGoldmanPlaza} actionButtons={actionButtons} {...defaultProps} /></div>)
  .add('actionButtons and add note', () => <div style={{ maxWidth: '380px' }} ><CommunityTile addNote canFavourite community={RhodaGoldmanPlaza} actionButtons={actionButtons} {...defaultProps} /></div>)
  .add('actionButtons, isFavourite and add note', () => <div style={{ maxWidth: '380px' }} ><CommunityTile addNote canFavourite isFavourite community={RhodaGoldmanPlaza} actionButtons={actionButtons} {...defaultProps} /></div>);
