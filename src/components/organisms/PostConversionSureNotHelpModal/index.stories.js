import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import PostConversionSureNotHelpModal from 'sly/components/organisms/PostConversionSureNotHelpModal';

const onDismiss = action('onDismiss');
const onAccept = action('onAccept');

storiesOf('Organisms|PostConversionSureNotHelpModal', module)
  .add('default', () => (
    <PostConversionSureNotHelpModal onDismiss={onDismiss} onAccept={onAccept} community={RhodaGoldmanPlaza} />
  ));
