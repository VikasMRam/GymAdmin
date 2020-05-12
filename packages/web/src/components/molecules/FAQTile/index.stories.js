import React from 'react';
import { storiesOf } from '@storybook/react';

import FAQTile from 'sly/web/components/molecules/FAQTile';

const props = {
  question: 'If Seniorly is free for searchers, how does it make money?',
  answer: `Seniorly is 100% free for searchers. That includes our website,
    email, online chat, SMS and even phone support. We are compensated by the
    community you eventually select.`,
};

storiesOf('Molecules|FAQTile', module)
  .add('default', () => <FAQTile {...props} />);
