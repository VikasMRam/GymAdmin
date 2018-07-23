import React from 'react';
import { storiesOf } from '@storybook/react';

import { SearchPageTileTexts as searchAdProps } from 'sly/services/helpers/ad';
import AdTile from '.';

function onClick() {
  alert('Ad Tile Clicked');
}

storiesOf('Molecules|AdTile', module)
  .add('default', () => <AdTile {...searchAdProps} onClick={onClick} />)
  .add('borderless', () => <AdTile {...searchAdProps} onClick={onClick} borderless />);
