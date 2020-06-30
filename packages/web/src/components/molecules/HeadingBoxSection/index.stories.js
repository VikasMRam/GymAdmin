import React from 'react';
import { storiesOf } from '@storybook/react';

import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';

const defaultProps = {
  heading: 'Profile',
};

storiesOf('Molecules|HeadingBoxSection', module)
  .add('default', () => <HeadingBoxSection {...defaultProps}>Hello</HeadingBoxSection>)
  .add('with hasNoBodyPadding', () => <HeadingBoxSection {...defaultProps} hasNoBodyPadding>Hello</HeadingBoxSection>);
