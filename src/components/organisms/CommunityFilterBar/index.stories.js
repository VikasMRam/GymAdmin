import React from 'react';
import { storiesOf } from '@storybook/react';

// import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import CommunityFilterBar from '.';

const paramsRemover = (elem) => {
  console.log('Callback with', elem);
};
const fullSp = {
  size: 'small',
  budget: '3000',
};

storiesOf('Organisms|CommunityFilterBar', module)
  .add('default', () => (
    <CommunityFilterBar searchParams={null} onParamsRemove={paramsRemover()} />
  ))
  .add('With All Filters', () => (
    <CommunityFilterBar
      searchParams={fullSp}
      onParamsRemove={paramsRemover()}
    />
  ));
