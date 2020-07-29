import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/common/services/helpers/forms';
import ThreeSectionFormTemplate from 'sly/web/components/molecules/ThreeSectionFormTemplate';

storiesOf('Molecules|ThreeSectionFormTemplate', module)
  .add('default', () => <ThreeSectionFormTemplate hasCancel onCancelClick={action('onCancelClick')} heading="test heading">Hello world</ThreeSectionFormTemplate>)
  .add('with submit', () => <ThreeSectionFormTemplate hasCancel hasSubmit onSubmit={withPreventDefault(action('onSubmit'))} onCancelClick={action('onCancelClick')} heading="test heading">Hello world</ThreeSectionFormTemplate>)
  .add('with only submit', () => <ThreeSectionFormTemplate hasSubmit onSubmit={withPreventDefault(action('onSubmit'))} heading="test heading">Hello world</ThreeSectionFormTemplate>)
  .add('without footer', () => <ThreeSectionFormTemplate hasSubmit noFooter buttonsFullWidth onSubmit={withPreventDefault(action('onSubmit'))} heading="test heading" description="test description">Hello world</ThreeSectionFormTemplate>);
