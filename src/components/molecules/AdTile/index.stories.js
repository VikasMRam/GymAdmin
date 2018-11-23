import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SearchPageTileTexts as searchAdProps } from 'sly/services/helpers/ad';
import AdTile from 'sly/components/molecules/AdTile';

storiesOf('Molecules|AdTile', module)
  .add('default', () => <AdTile {...searchAdProps} onClick={action('Ad Tile Clicked')} />)
  .add('borderless', () => <AdTile {...searchAdProps} onClick={action('Ad Tile Clicked')} borderless />);
