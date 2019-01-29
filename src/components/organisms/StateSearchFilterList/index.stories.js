import React from 'react';
import { storiesOf } from '@storybook/react';

import StateSearchFilterList from 'sly/components/organisms/StateSearchFilterList';

const seoLinks = [
  { to: 'foo', title: 'San Francisco' },
  { to: 'bar', title: 'New York' },
];
const toggleMap = () => {};
const onFieldChange = () => {};
const onParamsRemove = () => {};

storiesOf('Organisms|StateSearchFilterList', module).add('default', () => (
  <StateSearchFilterList
    seoLinks={seoLinks}
    toggleMap={toggleMap}
    isMapView={false}
    isModalView={false}
    searchParams={{}}
    onFieldChange={onFieldChange}
    onParamsRemove={onParamsRemove}
  />
))
  .add('Modal View', () => (
    <StateSearchFilterList
      seoLinks={seoLinks}
      toggleMap={toggleMap}
      isMapView={false}
      isModalView
      searchParams={{}}
      onFieldChange={onFieldChange}
      onParamsRemove={onParamsRemove}
    />
  ))
  .add('Map View', () => (
    <StateSearchFilterList
      seoLinks={seoLinks}
      toggleMap={toggleMap}
      isMapView
      isModalView={false}
      searchParams={{}}
      onFieldChange={onFieldChange}
      onParamsRemove={onParamsRemove}
    />
  ))
  .add('MapView & ModalView', () => (
    <StateSearchFilterList
      seoLinks={seoLinks}
      toggleMap={toggleMap}
      isMapView
      isModalView
      searchParams={{}}
      onFieldChange={onFieldChange}
      onParamsRemove={onParamsRemove}
    />
  ));
