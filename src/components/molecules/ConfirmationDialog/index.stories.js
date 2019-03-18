import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ConfirmationDialog from 'sly/components/molecules/ConfirmationDialog';

const defaultProps = {
  onConfirmClick: action('onConfirmClick'),
  onCancelClick: action('onCancelClick'),
};

storiesOf('Molecules|ConfirmationDialog', module)
  .add('default', () => (
    <ConfirmationDialog heading="Discard Note" confirmButtonText="Yes, Discard" {...defaultProps} />
  ))
  .add('with description', () => (
    <ConfirmationDialog heading="Discard Note" confirmButtonText="Yes, Discard" description="You can’t undo this, and you’ll lose any unsaved changes." {...defaultProps} />
  ));

