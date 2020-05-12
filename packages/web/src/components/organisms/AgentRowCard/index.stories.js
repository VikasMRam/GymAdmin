import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import agent from 'sly/web/../private/storybook/sample-data/agent-linda-iwamota.json';
import AgentRowCard from 'sly/web/components/organisms/AgentRowCard';

storiesOf('Organisms|AgentRowCard', module)
  .add('default', () => (
    <AgentRowCard
      agent={agent}
      onAgentClick={action('onAgentClick')}
    />
  ));
