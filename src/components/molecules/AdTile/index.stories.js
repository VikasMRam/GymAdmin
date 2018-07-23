import React from 'react';
import { storiesOf } from '@storybook/react';
import AdTile from '.';

const props = {
  title: 'Let the Seniorly Team Find Your Room',
  items: [
    { index: 0, text: 'Get Special Pricing' },
    { index: 1, text: 'Access to communities not yet listed' },
    { index: 2, text: 'Concierge team ready to assist' },
  ],
};

function onClick() {
  alert('Ad Tile Clicked');
}

storiesOf('Molecules|AdTile', module)
  .add('default', () => <AdTile {...props} onClick={onClick} />)
  .add('borderless', () => <AdTile {...props} onClick={onClick} borderless />);
