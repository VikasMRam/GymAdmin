import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityExtraInfoSection from 'sly/components/molecules/CommunityExtraInfoSection';

const title = 'Sagebrook Senior Living at San Francisco State licensing info';
const description = 'Sagebrook Senior Living (formerly Eden Villa) San Francisco is offical as shit';
const url = 'https://google.com';

storiesOf('Molecules|CommunityExtraInfoSection', module)
  .add('default', () => (
    <CommunityExtraInfoSection title={title} description={description} url={url} />
  ))
  .add('without url', () => (
    <CommunityExtraInfoSection title={title} description={description} />
  ));
