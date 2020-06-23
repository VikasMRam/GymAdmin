import React from 'react';
import { storiesOf } from '@storybook/react';

import GetAssessmentBox from 'sly/web/components/organisms/GetAssessmentBox';

storiesOf('Organisms|GetAssessmentBox', module)
  .add('default', () => <GetAssessmentBox />)
  .add('with palette', () => <GetAssessmentBox palette="primary" />)
  .add('with palette and fixed layout', () => <GetAssessmentBox palette="primary" layout="fixed" />);
