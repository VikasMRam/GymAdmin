import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/common/services/helpers/forms';
import { Products } from 'sly/web/components/wizards/assessment';

const ProductsContainer = reduxForm({
  form: 'Products',
})(Products);

storiesOf('Wizards|assessment/Steps/Products', module)
  .add('default', () => (
    <ProductsContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="parents"
    />
  ))
  .add('without tip', () => (
    <ProductsContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="parents"
      hasTip={false}
    />
  ));
