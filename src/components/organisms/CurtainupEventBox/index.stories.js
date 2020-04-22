import React from 'react';
import { storiesOf } from '@storybook/react';

import Performer1 from 'sly/../private/storybook/sample-data/performer-1.json';
import Performer2 from 'sly/../private/storybook/sample-data/performer-2.json';
import Event1 from 'sly/../private/storybook/sample-data/event-1.json';
import CurtainupEventBox from 'sly/components/organisms/CurtainupEventBox';

const performers = [
  Performer1,
  Performer2,
];

storiesOf('Organisms|CurtainupEventBox', module)
  .add('default', () => (
    <CurtainupEventBox
      event={Event1}
      performers={performers}
    />
  ))
  .add('with palette', () => (
    <CurtainupEventBox
      event={Event1}
      performers={performers}
      palette="razzmatazz"
    />
  ));
