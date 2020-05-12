import React from 'react';
import { storiesOf } from '@storybook/react';

import Tag from 'sly/web/components/atoms/Tag';

storiesOf('Atoms|Tag', module)
  .add('default', () => (
    <Tag>
      assisted living
    </Tag>
  ))
  .add('palette', () => (
    <Tag palette="primary">
      assisted living
    </Tag>
  ));
