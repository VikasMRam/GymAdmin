import React from 'react';
import { storiesOf } from '@storybook/react';

import { ALSeoCities} from 'sly/services/helpers/homepage';
import SeoLinks from '.';


storiesOf('Organisms|SeoLinks', module)
  .add('default', () => (
    <SeoLinks title="Collection of links" links={ALSeoCities}/>
  ));
