import React from 'react';
import { storiesOf } from '@storybook/react';

import HomeCTABox from '.';

import { assetPath } from 'sly/web/components/themes';

storiesOf('Organisms|HomeCTABox', module)
  .add('default', () => (
    <HomeCTABox
      image={assetPath('vectors/home/advisor.svg')}
      heading="Your own advisor"
      buttonText="Speak with an expert"
    >
      We connect you with a Seniorly Local Advisor, our trusted partner who knows the communities in your area. Rely on your advisor as much or as little as you need to find a new home you&apos;ll love.
    </HomeCTABox>
  ));
