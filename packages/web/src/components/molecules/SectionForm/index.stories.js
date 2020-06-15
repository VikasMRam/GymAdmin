import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SectionForm from 'sly/web/components/molecules/SectionForm';
import { withPreventDefault } from 'sly/web/services/helpers/forms';

const defaultProps = {
  heading: 'Profile',
  handleSubmit: withPreventDefault(action('form submitted')),
};

storiesOf('Molecules|SectionForm', module)
  .add('default', () => <SectionForm {...defaultProps} >Hello</SectionForm>)
  .add('with Button', () => <SectionForm {...defaultProps} buttonText="Save Changes">Hello</SectionForm>);
