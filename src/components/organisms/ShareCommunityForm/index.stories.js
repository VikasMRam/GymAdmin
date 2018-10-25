import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';

import ShareCommunityForm from '.';

const ShareCommunityFormContainer = reduxForm({
  form: 'SaveCommunityForm',
})(ShareCommunityForm);

const mainImage = 'https://d1qiigpe5txw4q.cloudfront.net/uploads/e47618a1f18f541e199ab6f97ebb19ef/Jim%2520business%2520photo_sd.jpg';

storiesOf('Organisms|ShareCommunityForm', module)
  .add('default', () => <ShareCommunityFormContainer mainImage={mainImage} />)
  .add('from disabled', () => <ShareCommunityFormContainer mainImage={mainImage} fromEnabled={false} />)
  .add('without main image', () => <ShareCommunityFormContainer />);
