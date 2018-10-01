import React from 'react';
import { storiesOf } from '@storybook/react';

import SaveCommunityForm from '.';

storiesOf('Organisms|SaveCommunityForm', module)
  .add('not loggedin', () => <SaveCommunityForm loggedin={false} />);
