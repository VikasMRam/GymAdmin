import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';
import PostConversionAskNotHelpModal from 'sly/web/components/organisms/PostConversionAskNotHelpModal';

const onDismiss = action('onDismiss');
const onAccept = action('onAccept');

storiesOf('Organisms|EntryModal', module)
  .add('default', () => (
    <PostConversionAskNotHelpModal onDismiss={onDismiss} onAccept={onAccept} community={RhodaGoldmanPlaza} />
  ));
