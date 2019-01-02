import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityCareService from 'sly/components/organisms/CommunityCareService';
import CollapsibleSection from 'sly/components/molecules/CollapsibleSection';
import { careServiceMap } from 'sly/services/helpers/community';

const careServices = ['24-Hour Call System', 'Mental Wellness Program', 'Hospice Waiver', 'Memory Care'];

storiesOf('Organisms|CommunityCareService', module)
  .add('default', () => (
    <CollapsibleSection title="Care Services at Sagebrook Senior Living at San Francisco">
      <CommunityCareService careServiceMap={careServiceMap} careServices={careServices} />
    </CollapsibleSection>
  ));
