import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AdvandedInfoContainer from 'sly/containers/AdvancedInfoContainer';

const community = {
  name: 'Rhoda Goldman Plaza',
};

const user = {
  name: 'Ashley Clark',
};

storiesOf('Organisms|AdvancedInfoForm', module).add('default', () => (
  <AdvandedInfoContainer
    handleSubmit={action('submit!')}
    community={community}
    user={user}
  />
));
