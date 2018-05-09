import React from 'react';
import { storiesOf } from '@storybook/react';
import IconButton from '.';

storiesOf('Molecules|IconButton', module)
  .add('default', () => <IconButton icon="close">Hello</IconButton>)
  .add('transparent', () => (
    <IconButton icon="close" transparent>
      Hello
    </IconButton>
  ))
  .add('with icon on right', () => (
    <IconButton icon="close" right>
      Hello
    </IconButton>
  ))
  .add('without text', () => <IconButton icon="close" />)
  .add('collapsed', () => (
    <IconButton icon="close" collapsed>
      Hello
    </IconButton>
  ))
  .add('height', () => (
    <IconButton icon="close" height={100}>
      Hello
    </IconButton>
  ))
  .add('Seach Filter Button', () => (
    <IconButton
      right
      icon="close"
      iconSize="small"
      palette="grayscale"
      ghost
      transparent
    >
      Budget: Up to $2500
    </IconButton>
  ));
