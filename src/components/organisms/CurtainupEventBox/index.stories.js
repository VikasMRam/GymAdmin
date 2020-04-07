import React from 'react';
import { storiesOf } from '@storybook/react';

import CurtainupEventBox from 'sly/components/organisms/CurtainupEventBox';
import { assetPath } from 'sly/components/themes';

// todo: replace with json dump when api is ready
const performers = [
  {
    name: 'Jackie Burns',
    description: '"Wicked," "Hair," "If/Then"',
    gallery: {
      id: 'dsfdsfs',
      images: [
        {
          id: 'sdfsdfsd',
          name: 'arthur.png',
          path: assetPath('images/curtainup/arthur.png'),
        },
      ],
    },
  },
  {
    name: 'Jackie Burns 1',
    description: '"Wicked," "Hair," "If/Then"',
    gallery: {
      id: 'dsfdsfs',
      images: [
        {
          id: 'sdfsdfsd',
          name: 'arthur.png',
          path: assetPath('images/curtainup/arthur.png'),
        },
      ],
    },
  },
  {
    name: 'Jackie Burns 2',
    description: '"Wicked," "Hair," "If/Then"',
    gallery: {
      id: 'dsfdsfs',
      images: [
        {
          id: 'sdfsdfsd',
          name: 'arthur.png',
          path: assetPath('images/curtainup/arthur.png'),
        },
      ],
    },
  },
];

storiesOf('Organisms|CurtainupEventBox', module)
  .add('default', () => (
    <CurtainupEventBox
      date="2020-04-02T08:02:17-05:00"
      performers={performers}
    />
  ))
  .add('with palette', () => (
    <CurtainupEventBox
      date="2020-04-02T08:02:17-05:00"
      performers={performers}
      palette="razzmatazz"
    />
  ));
