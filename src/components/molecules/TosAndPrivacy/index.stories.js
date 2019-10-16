import React from 'react';
import { storiesOf } from '@storybook/react';

import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';

storiesOf('Molecules|TosAndPrivacy', module)
  .add('default', () => <TosAndPrivacy />)
  .add('with openLinkInNewTab', () => <TosAndPrivacy openLinkInNewTab />);
