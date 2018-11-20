import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunitySATAcknowledgement from 'sly/components/organisms/CommunitySATAcknowledgement';

const defaultProps = {
  communityName: 'Rhoda Goldman Plaza',
  communityImageUrl: 'https://d1qiigpe5txw4q.cloudfront.net/uploads/a634ab75e610e745ced00211580c5d54/RGP-June-2014_hd2_sd.jpg',
  appointmentText: 'Saturday, October 21 in the Morning',
  onButtonClick: action('SAT clicked'),
};

storiesOf('Organisms|CommunitySATAcknowledgement', module)
  .add('default', () => (
    <CommunitySATAcknowledgement {...defaultProps} />
  ));
