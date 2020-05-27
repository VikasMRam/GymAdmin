import React from 'react';
import { storiesOf } from '@storybook/react';

import TipBox from 'sly/web/components/molecules/TipBox';
import pad from 'sly/web/components/helpers/pad';
import IconItem from 'sly/web/components/molecules/IconItem';

const PaddedIconItem = pad(IconItem, 'large');

storiesOf('Molecules|TipBox', module)
  .add('default', () => (
    <TipBox heading="DID YOU KNOW?">
      We’ve been through this with thousands of loved ones. You’re in good hands!
    </TipBox>
  ))
  .add('with icon list', () => (
    <TipBox heading="WHY THIS IS IMPORTANT:">
      <PaddedIconItem icon="favourite-light" iconPalette="slate" iconVariation="base">Getting to know you helps us personalize how we assist you.</PaddedIconItem>
      <IconItem icon="lock" iconPalette="slate" iconVariation="base">Any information you share with us is private and secure.</IconItem>
    </TipBox>
  ));
