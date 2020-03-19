import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MatchedAgent from 'sly/components/organisms/MatchedAgent';
import LindaIwamota from 'sly/../private/storybook/sample-data/agent-linda-iwamota.json';

storiesOf('Organisms|MatchedAgent', module)
  .add('default', () => (
    <MatchedAgent
      heading="Sarah will call you shortly to assist you with pricing for Portola Gardens"
      agent={LindaIwamota}
      onLearnMoreClick={action('onLearnMoreClick')}
    />
  ))
  .add('without agent', () => (
    <MatchedAgent
      heading="Sarah will call you shortly to assist you with pricing for Portola Gardens"
      onLearnMoreClick={action('onLearnMoreClick')}
    />
  ));
