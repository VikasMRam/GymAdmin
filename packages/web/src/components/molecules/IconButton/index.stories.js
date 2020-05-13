import React from 'react';
import { storiesOf } from '@storybook/react';

import IconButton from 'sly/web/components/molecules/IconButton';

storiesOf('Molecules|IconButton', module)
  .add('default', () => <IconButton icon="share">Share</IconButton>)
  .add('transparent', () => (
    <IconButton icon="share" transparent>
      Hello
    </IconButton>
  ))
  .add('Share button', () => (
    <IconButton icon="share" ghost transparent>
      Share
    </IconButton>
  ))
  .add('with icon on right', () => (
    <IconButton icon="share" right>
      Hello
    </IconButton>
  ))
  .add('with icon on right full width', () => (
    <IconButton icon="share" right fullWidth>
      Hello
    </IconButton>
  ))
  .add('with icon on right full width ghost', () => (
    <IconButton
      icon="share"
      right
      fullWidth
      ghost
      transparent
    >
      Hello
    </IconButton>
  ))
  .add('with icon on right full width border color', () => (
    <IconButton
      icon="share"
      right
      fullWidth
      ghost
      transparent
      borderPalette="slate"
    >
      Hello
    </IconButton>
  ))
  .add('without text', () => <IconButton icon="share" />)
  .add('collapsed', () => (
    <IconButton icon="share" collapsed>
      Hello
    </IconButton>
  ))
  .add('Search Filter Button', () => (
    <IconButton
      right
      icon="share"
      palette="slate"
      ghost
      transparent
    >
      Budget: Up to $2500
    </IconButton>
  ))
  .add('Hide Text in Mobile', () => (
    <IconButton icon="share" hideTextInMobile>
      Hello
    </IconButton>
  ));
