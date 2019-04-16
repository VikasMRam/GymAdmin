import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';

storiesOf('Molecules|ThreeSectionFormTemplate', module)
  .add('default', () => <ThreeSectionFormTemplate hasCancel onCancelClick={action('onCancelClick')} heading="test heading">Hello world</ThreeSectionFormTemplate>)
  .add('with submit', () => <ThreeSectionFormTemplate hasCancel hasSubmit onCancelClick={action('onCancelClick')} onSubmitClick={action('onSubmitClick')} heading="test heading">Hello world</ThreeSectionFormTemplate>)
  .add('with only submit', () => <ThreeSectionFormTemplate hasSubmit onSubmitClick={action('onSubmitClick')} heading="test heading">Hello world</ThreeSectionFormTemplate>);
