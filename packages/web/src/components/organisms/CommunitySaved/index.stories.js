import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunitySaved from 'sly/web/components/organisms/CommunitySaved';
import RhodaGoldmanPlaza from 'sly/web/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { similarProperties } = RhodaGoldmanPlaza;

storiesOf('Organisms|CommunitySaved', module)
  .add('default', () => (
    <CommunitySaved similarCommunities={similarProperties} onDoneButtonClicked={action('done button clicked')} />
  ));
