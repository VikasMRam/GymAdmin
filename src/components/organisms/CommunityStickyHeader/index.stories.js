import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityStickyHeader from '.';

const dummyRef = React.createRef();
const items = [
  { label: 'Summary', ref: dummyRef },
  { label: 'Pricing & Floor Plans', ref: dummyRef },
  { label: 'Reviews', ref: dummyRef },
];

storiesOf('Organisms|CommunityStickyHeader', module)
  .add('default', () => <CommunityStickyHeader items={items} />);
