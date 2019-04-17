import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/services/helpers/forms';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';

storiesOf('Molecules|ThreeSectionFormTemplate', module)
  .add('default', () => <ThreeSectionFormTemplate hasCancel onCancelClick={action('onCancelClick')} heading="test heading">Hello world</ThreeSectionFormTemplate>)
  .add('with submit', () => <ThreeSectionFormTemplate hasCancel hasSubmit onSubmit={withPreventDefault(action('onSubmit'))} onCancelClick={action('onCancelClick')} heading="test heading">Hello world</ThreeSectionFormTemplate>)
  .add('with only submit', () => <ThreeSectionFormTemplate hasSubmit onSubmit={withPreventDefault(action('onSubmit'))} heading="test heading">Hello world</ThreeSectionFormTemplate>);
