import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PostConversionGreetingForm from 'sly/components/organisms/PostConversionGreetingForm';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const onReject = action('onReject');

storiesOf('Organisms|PostConversionGreetingForm', module)
  .add('default', () => (
    <PostConversionGreetingForm onReject={onReject} community={RhodaGoldmanPlaza} />
  ));
