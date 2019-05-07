import React from 'react';
import { storiesOf } from '@storybook/react';

import Tabs from 'sly/components/molecules/Tabs';

storiesOf('Molecules|Tabs', module)
  .add('default', () => (
    <div style={{ backgroundColor: 'grey1' }}>
      <Tabs>
        <div label="Gator">
          See ya later, <em>Alligator</em>!
        </div>
        <div label="Croc">
          After while, <em>Crocodile</em>!
        </div>
        <div label="Sarcosuchus">
          Nothing to see here, this tab is <em>extinct</em>!
        </div>
      </Tabs>
    </div>
  ))
  .add('with activeTab', () => (
    <div style={{ backgroundColor: 'grey1' }}>
      <Tabs activeTab="Croc">
        <div label="Gator">
          See ya later, <em>Alligator</em>!
        </div>
        <div label="Croc">
          After while, <em>Crocodile</em>!
        </div>
        <div label="Sarcosuchus">
          Nothing to see here, this tab is <em>extinct</em>!
        </div>
      </Tabs>
    </div>
  ));
