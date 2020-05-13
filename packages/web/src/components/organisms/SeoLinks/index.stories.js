import React from 'react';
import { storiesOf } from '@storybook/react';

import SeoLinks from 'sly/web/components/organisms/SeoLinks';
import { ALSeoCities } from 'sly/web/services/helpers/homepage';


storiesOf('Organisms|SeoLinks', module)
  .add('default', () => (
    <SeoLinks title="Collection of links" links={ALSeoCities} />
  ));
