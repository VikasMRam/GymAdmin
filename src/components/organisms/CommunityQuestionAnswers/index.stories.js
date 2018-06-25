import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import CommunityQuestionAnswers from '.';

const { questions } = RhodaGoldmanPlaza;

storiesOf('Organisms|CommunityQuestionAnswers', module).add('default', () => (
  <CommunityQuestionAnswers
    questions={questions}
  />
));
