import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunityTile from 'sly/components/organisms/CommunityTile';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const note = 'Location is great. This community is near my hosue, I can visit my mom in just a 20 minute drive. Big mood.';
const defaultProps = {
  onFavouriteClick: action('onFavouriteClick'),
  onUnfavouriteClick: action('onUnfavouriteClick'),
  onAskQuestionClick: action('onAskQuestionClick'),
  onEditNoteClick: action('onEditNoteClick'),
  onAddNoteClick: action('onAddNoteClick'),
  onSlideChange: action('onSlideChange'),
};

storiesOf('Organisms|CommunityTile', module)
  .add('default', () => <div style={{ maxWidth: '380px' }} ><CommunityTile community={RhodaGoldmanPlaza} {...defaultProps} /></div>)
  .add('with actionButtons', () => <div style={{ maxWidth: '380px' }} ><CommunityTile community={RhodaGoldmanPlaza} actionButtons={['ask-question']} {...defaultProps} /></div>)
  .add('with actionButtons and note', () => <div style={{ maxWidth: '380px' }} ><CommunityTile note={note} community={RhodaGoldmanPlaza} actionButtons={['ask-question']} {...defaultProps} /></div>)
  .add('with actionButtons and add note', () => <div style={{ maxWidth: '380px' }} ><CommunityTile addNote community={RhodaGoldmanPlaza} actionButtons={['ask-question']} {...defaultProps} /></div>)
  .add('with actionButtons, isFavourite and add note', () => <div style={{ maxWidth: '380px' }} ><CommunityTile addNote isFavourite community={RhodaGoldmanPlaza} actionButtons={['ask-question']} {...defaultProps} /></div>)
  .add('small size', () => <div style={{ maxWidth: '288px' }} ><CommunityTile community={RhodaGoldmanPlaza} /></div>)
  .add('small size and with actionButtons', () => <div style={{ maxWidth: '288px' }} ><CommunityTile community={RhodaGoldmanPlaza} actionButtons={['ask-question']} {...defaultProps} /></div>)
  .add('small size, with actionButtons and note', () => <div style={{ maxWidth: '288px' }} ><CommunityTile note={note} community={RhodaGoldmanPlaza} actionButtons={['ask-question']} {...defaultProps} /></div>)
  .add('small size, with actionButtons and add note', () => <div style={{ maxWidth: '288px' }} ><CommunityTile addNote community={RhodaGoldmanPlaza} actionButtons={['ask-question']} {...defaultProps} /></div>)
  .add('small size, with actionButtons, isFavourite and add note', () => <div style={{ maxWidth: '288px' }} ><CommunityTile addNote isFavourite community={RhodaGoldmanPlaza} actionButtons={['ask-question']} {...defaultProps} /></div>);
