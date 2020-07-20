import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunityQuestionAnswers from 'sly/web/components/organisms/CommunityQuestionAnswers';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { questions } = RhodaGoldmanPlaza;
const communityName = 'Rhoda Goldman Plaza';

storiesOf('Organisms|CommunityQuestionAnswers', module).add('default', () => (
  <CommunityQuestionAnswers
    questions={questions}
    communityName={communityName}
    onLeaveAnswerClick={action('onLeaveAnswerClick')}
    onAskQuestionClick={action('onAskQuestionClick')}
  />
));
