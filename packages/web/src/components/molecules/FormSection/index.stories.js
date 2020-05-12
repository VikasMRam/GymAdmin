import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FormSection from 'sly/web/components/molecules/FormSection';
import { withPreventDefault } from 'sly/web/services/helpers/forms';

const defaultProps = {
  heading: 'My Profile',
  handleSubmit: withPreventDefault(action('form submitted')),
};

storiesOf('Molecules|FormSection', module)
  .add('default', () => <FormSection {...defaultProps} >Hello</FormSection>)
  .add('with Button', () => <FormSection {...defaultProps} buttonText="Save Changes">Hello</FormSection>);
