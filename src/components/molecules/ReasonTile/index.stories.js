import React from 'react';
import { storiesOf } from '@storybook/react';
import ReasonTile from '.';

const onInquireOrBookClicked = () => {
  alert('open book modal');
};

storiesOf('Molecules|ReasonTile', module)
  .add('default', () =>(
    <ReasonTile
      image="https://d1qiigpe5txw4q.cloudfront.net/uploads/c12040412664de0a0c9443dc952ba53b/63047_SunriseofSanMateo_SanMateo_CA_AptBed_sd.jpg"
      title="Seniorly is great"
      text="Seniorly is great for a lot of reasons"
      to="/hiw"
    />))


