import React from 'react';
import { storiesOf } from '@storybook/react';

import StickyFooter from 'sly/components/molecules/StickyFooter';

const footerInfo = { title: 'Property Manager', name: 'Agent Carter', ctaTitle: 'Contact Us' };

storiesOf('Molecules|StickyFooter', module).add('default', () => (
  <StickyFooter footerInfo={footerInfo} />
));
