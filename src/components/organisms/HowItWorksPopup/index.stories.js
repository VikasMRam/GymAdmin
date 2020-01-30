import React from 'react';
import { storiesOf } from '@storybook/react';

import HowItWorksPopup from 'sly/components/organisms/HowItWorksPopup';

storiesOf('Organisms|HowItWorksPopup', module)
  .add('default', () => <HowItWorksPopup />);