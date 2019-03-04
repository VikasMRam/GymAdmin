import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FormSection from 'sly/components/molecules/FormSection';

const defaultProps = {
  heading: 'My Profile',
};

storiesOf('Molecules|FormSection', module)
  .add('default', () => <FormSection {...defaultProps} >Hello</FormSection>)
  .add('with Button', () => <FormSection {...defaultProps} buttonText="Save Changes" onSubmit={action('Click on Button')} >Hello</FormSection>);
