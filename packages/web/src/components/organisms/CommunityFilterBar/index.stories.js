import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// import RhodaGoldmanPlaza from 'sly/web/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import CommunityFilterBar from '.';

const paramsRemover = (elem) => {
  action('Callback with', elem);
};
const fullSp = {
  size: 'small',
  budget: 3000,
};

storiesOf('Organisms|CommunityFilterBar', module)
  .add('default', () => (
    <CommunityFilterBar searchParams={{}} onParamsRemove={paramsRemover()} />
  ))
  .add('With All Filters', () => (
    <CommunityFilterBar
      searchParams={fullSp}
      onParamsRemove={paramsRemover()}
    />
  ));
