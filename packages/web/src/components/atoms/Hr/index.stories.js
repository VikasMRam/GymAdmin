import React from 'react';
import { storiesOf } from '@storybook/react';

import Hr from 'sly/web/components/atoms/Hr';

storiesOf('Atoms|Hr', module)
  .add('default', () => <Hr />)
  .add('Primary Palette', () => <Hr palette="primary" />)
  .add('Secondary Palette', () => <Hr palette="secondary" />);
