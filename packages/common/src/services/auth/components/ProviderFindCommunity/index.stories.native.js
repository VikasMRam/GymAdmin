import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import ProviderFindCommunity from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const ProviderFindCommunityContainer = reduxForm({
  form: 'ProviderFindCommunity',
})(ProviderFindCommunity);

storiesOf('Common|Services/Auth/ProviderFindCommunity', module)
  .add('default', () => (
    <ProviderFindCommunityContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSelectChange={action('community selected')}
      onNotFound={action('community not found clicked')}
    />
  ));
