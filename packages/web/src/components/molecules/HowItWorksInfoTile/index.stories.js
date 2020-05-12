import React from 'react';
import { storiesOf } from '@storybook/react';

import HowItWorksInfoTile from 'sly/components/molecules/HowItWorksInfoTile';

const props = {
  heading: 'Use our powerful search platform',
  content: `We have built a best-in-class search platform that has been proven to provide the most useful results.
    Enter the city or zip code of where you are looking for housing and let the search platform do the rest.
    You will have access to all details without having to provide any personal information.`,
};

storiesOf('Molecules|HowItWorksInfoTile', module)
  .add('default', () => <HowItWorksInfoTile {...props} />)
  .add('invert', () => <HowItWorksInfoTile {...props} invert />);
