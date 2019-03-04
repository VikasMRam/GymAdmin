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
  .add('with actions', () => <div style={{ maxWidth: '380px' }} ><CommunityTile community={RhodaGoldmanPlaza} actions={['ask-question']} {...defaultProps} /></div>)
  .add('with actions and note', () => <div style={{ maxWidth: '380px' }} ><CommunityTile note={note} community={RhodaGoldmanPlaza} actions={['ask-question']} {...defaultProps} /></div>)
  .add('with actions and add note', () => <div style={{ maxWidth: '380px' }} ><CommunityTile addNote community={RhodaGoldmanPlaza} actions={['ask-question']} {...defaultProps} /></div>)
  .add('with actions, isFavourite and add note', () => <div style={{ maxWidth: '380px' }} ><CommunityTile addNote isFavourite community={RhodaGoldmanPlaza} actions={['ask-question']} {...defaultProps} /></div>)
  .add('small size', () => <div style={{ maxWidth: '288px' }} ><CommunityTile community={RhodaGoldmanPlaza} /></div>)
  .add('small size and with actions', () => <div style={{ maxWidth: '288px' }} ><CommunityTile community={RhodaGoldmanPlaza} actions={['ask-question']} {...defaultProps} /></div>)
  .add('small size, with actions and note', () => <div style={{ maxWidth: '288px' }} ><CommunityTile note={note} community={RhodaGoldmanPlaza} actions={['ask-question']} {...defaultProps} /></div>)
  .add('small size, with actions and add note', () => <div style={{ maxWidth: '288px' }} ><CommunityTile addNote community={RhodaGoldmanPlaza} actions={['ask-question']} {...defaultProps} /></div>)
  .add('small size, with actions, isFavourite and add note', () => <div style={{ maxWidth: '288px' }} ><CommunityTile addNote isFavourite community={RhodaGoldmanPlaza} actions={['ask-question']} {...defaultProps} /></div>);
