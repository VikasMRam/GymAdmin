import React from 'react';
import { storiesOf } from '@storybook/react';
import AdTile from '.';

function onClick() {
  alert('Ad Tile Clicked');
}

storiesOf('Molecules|AdTile', module)
  .add('default', () => <AdTile onClick={onClick} />)
  .add('borderless', () => <AdTile onClick={onClick} borderless />);
