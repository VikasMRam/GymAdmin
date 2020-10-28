import React from 'react';
import { storiesOf } from '@storybook/react';

import GetAssessmentBox from '.';

storiesOf('Organisms|GetAssessmentBox', module)
  .add('default', () => <GetAssessmentBox />)
  .add('palette and background', () => <GetAssessmentBox background="danger" palette="warning" />)
  .add('layout', () => <GetAssessmentBox layout="row" />);
