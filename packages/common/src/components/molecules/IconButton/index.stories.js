import React from 'react';
import { storiesOf } from '@storybook/react';

import IconButton from '.';

storiesOf('Common|Molecules/IconButton', module)
  .add('default', () => <IconButton icon="share">Share</IconButton>)
  .add('transparent', () => (
    <IconButton icon="share" transparent>
      Hello
    </IconButton>
  ))
  .add('ghost', () => (
    <IconButton icon="share" ghost>
      Share
    </IconButton>
  ))
  .add('ghost and transparent', () => (
    <IconButton icon="share" ghost transparent>
      Share
    </IconButton>
  ))
  .add('right', () => (
    <IconButton icon="share" right>
      Hello
    </IconButton>
  ))
  .add('palette', () => (
    <IconButton icon="share" palette="danger">
      Hello
    </IconButton>
  ))
  .add('iconPalette', () => (
    <IconButton icon="share" iconPalette="danger">
      Hello
    </IconButton>
  ))
  .add('palette and iconPalette', () => (
    <IconButton icon="share" palette="warning" iconPalette="danger">
      Hello
    </IconButton>
  ))
  .add('right and width', () => (
    <>
      <IconButton icon="share" right width="100%">
        Hello
      </IconButton>
      <IconButton icon="share" right width="50%">
        Hello
      </IconButton>
    </>
  ))
  .add('noSpaceBetween and width', () => (
    <>
      <IconButton icon="share" noSpaceBetween width="100%">
        Hello
      </IconButton>
      <IconButton icon="share" noSpaceBetween width="50%">
        Hello
      </IconButton>
    </>
  ))
  .add('right, width and ghost', () => (
    <IconButton
      icon="share"
      width="100%"
      right
      ghost
      transparent
    >
      Hello
    </IconButton>
  ))
  .add('right, width and border color', () => (
    <IconButton
      icon="share"
      width="100%"
      borderPalette="slate"
      right
      ghost
      transparent
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
      icon="share"
      palette="slate"
      right
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
