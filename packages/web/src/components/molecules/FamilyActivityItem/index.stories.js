import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FamilyActivityItem from 'sly/components/molecules/FamilyActivityItem';

storiesOf('Molecules|FamilyActivityItem', module)
  .add('default', () => (
    <FamilyActivityItem date="2019-04-05T15:54:06Z" title="You got a new lead!" description="J. and his mother are looking for Assisted Living in Los Angeles. She is looking for a community that is very active and has a lot of activities and outings." />
  ))
  .add('with edit note', () => (
    <FamilyActivityItem onEditClick={action('onEditClick')} date="2019-04-05T15:54:06Z" title="You got a new lead!" description="J. and his mother are looking for Assisted Living in Los Angeles. She is looking for a community that is very active and has a lot of activities and outings." />
  ));
