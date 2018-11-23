import React from 'react';
import { storiesOf } from '@storybook/react';

import { assetPath } from 'sly/components/themes';
import ReasonTile from 'sly/components/molecules/ReasonTile';

storiesOf('Molecules|ReasonTile', module)
  .add('default', () => (
    <div style={{ padding: '10px' }}>
      <ReasonTile
        image={assetPath('vectors/Support.svg')}
        title="Seniorly is great"
        text="Seniorly is great for a lot of reasons"
        to="/hiw"
      />
    </div>
  ));
