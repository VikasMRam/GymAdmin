import React from 'react';
import { storiesOf } from '@storybook/react';

import FactBox from 'sly/web/components/molecules/FactBox';

storiesOf('Molecules|FactBox', module)
  .add('default', () => (
    <FactBox title="30,000+" description="families found a home with the help of Seniorly Partner Advisors" />
  ));
