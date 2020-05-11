import React from 'react';
import { storiesOf } from '@storybook/react';

import SeoLinks from 'sly/components/organisms/SeoLinks';
import { ALSeoCities } from 'sly/services/helpers/homepage';


storiesOf('Organisms|SeoLinks', module)
  .add('default', () => (
    <SeoLinks title="Collection of links" links={ALSeoCities} />
  ));
