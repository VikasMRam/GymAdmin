import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import PostConversionAskNotHelpModal from 'sly/components/organisms/PostConversionAskNotHelpModal';

const onDismiss = action('onDismiss');
const onAccept = action('onAccept');

storiesOf('Organisms|PostConversionAskNotHelpModal', module)
  .add('default', () => (
    <PostConversionAskNotHelpModal onDismiss={onDismiss} onAccept={onAccept} community={RhodaGoldmanPlaza} />
  ));
