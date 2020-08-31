import React from 'react';
import { storiesOf } from '@storybook/react-native';

import HrWithText from '.';

storiesOf('Common|Molecules/HrWithText', module)
  .add('default', () => <HrWithText>Today</HrWithText>)
  .add('badgeText', () => <HrWithText badgeText="New">Sunday, June 3rd</HrWithText>)
  .add('only badgeText', () => <HrWithText badgeText="New" />)
  .add('badgeText and palette', () => (
    <HrWithText
      badgeText="New"
      palette="danger"
      variation="base"
      badgeTextpalette="white"
    >
      Sunday, June 3rd
    </HrWithText>
  ));
