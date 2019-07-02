import React from 'react';
import { storiesOf } from '@storybook/react';

import HrWithText from 'sly/components/molecules/HrWithText';

storiesOf('Molecules|HrWithText', module)
  .add('default', () => <HrWithText text="Today" />)
  .add('with badgeText', () => <HrWithText text="Sunday, June 3rd" badgeText="New" />)
  .add('with badgeText and palette', () => <HrWithText text="Sunday, June 3rd" badgeText="New" palette="danger" variation="base" badgeTextpalette="white" />);
