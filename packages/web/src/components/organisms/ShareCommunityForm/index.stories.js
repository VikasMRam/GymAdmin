import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';

import ShareCommunityForm from 'sly/web/components/organisms/ShareCommunityForm';

const ShareCommunityFormContainer = reduxForm({
  form: 'SaveCommunityForm',
})(ShareCommunityForm);

storiesOf('Organisms|ShareCommunityForm', module)
  .add('default', () => <ShareCommunityFormContainer />)
  .add('from disabled', () => <ShareCommunityFormContainer fromEnabled={false} />);
