import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunitySATAcknowledgement from 'sly/components/organisms/CommunitySATAcknowledgement';

const defaultProps = {
  communityName: 'Rhoda Goldman Plaza',
  communityImageUrl: 'https://d1qiigpe5txw4q.cloudfront.net/uploads/a634ab75e610e745ced00211580c5d54/RGP-June-2014_hd2_sd.jpg',
  appointmentText: 'Saturday, October 21 in the Morning',
  similarCommunititesHref: 'www.teamseniorly.com',
  heading: 'Tour Request Sent!',
  subheading: 'Your advisor will check if this community is available at this time. They will get back to you shortly by phone or email.',
};

storiesOf('Organisms|CommunitySATAcknowledgement', module)
  .add('default', () => (
    <CommunitySATAcknowledgement {...defaultProps} />
  ));
