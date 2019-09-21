import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DuplicateFamilies from 'sly/components/organisms/DuplicateFamilies';
import { withPreventDefault } from 'sly/services/helpers/forms';
import clients from 'sly/../private/storybook/sample-data/clients.json';

storiesOf('Organisms|DuplicateFamilies', module)
  .add('default', () => <DuplicateFamilies onAddFamily={withPreventDefault(action('onAddFamily'))} clients={clients.slice(0, 2)} />);
