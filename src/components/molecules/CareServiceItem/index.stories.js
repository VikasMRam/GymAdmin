import React from 'react';
import { storiesOf } from '@storybook/react';

import CareServiceItem from 'sly/components/molecules/CareServiceItem';

storiesOf('Molecules|CareServiceItem', module)
  .add('default', () => <CareServiceItem icon="check" text="Hospice Waiver" />)
  .add('Not Present', () => <CareServiceItem icon="close" palette="grey" text="Medication Management" />)
  .add('Unknown', () => <CareServiceItem icon="unknown" palette="grey" text="Rehabilitation Program" />);
