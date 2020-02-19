import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AskAgentAdTile from 'sly/components/organisms/AskAgentAdTile';

storiesOf('Organisms|AskAgentAdTile', module)
  .add('default', () => (
    <AskAgentAdTile
      title="This the title of an ad tile. It can span up to 2 lines if needed."
      description="Our Local Senior Living Experts can help you with X"
      onAskExpertQuestionClick={action('onAskExpertQuestionClick')}
    />
  ));
