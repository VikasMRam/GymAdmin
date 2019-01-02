import React from 'react';
import { storiesOf } from '@storybook/react';

import CareServiceItem from 'sly/components/molecules/CareServiceItem';

storiesOf('Molecules|CareServiceItem', module)
  .add('default', () => <CareServiceItem icon="check" text="Hospice Waiver" />)
  .add('Not Present', () => <CareServiceItem icon="close" iconPalette="grey" textVariation="filler" text="Medication Management" />)
  .add('Unknown', () => <CareServiceItem icon="unknown" iconPalette="grey" textVariation="filler" text="Rehabilitation Program" />);
