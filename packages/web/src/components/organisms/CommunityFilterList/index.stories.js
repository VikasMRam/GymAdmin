import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityFilterList from 'sly/web/components/organisms/CommunityFilterList';

const toggleMap = () => {};
const onFieldChange = () => {};
const onParamsRemove = () => {};

storiesOf('Organisms|CommunityFilterList', module).add('default', () => (
  <CommunityFilterList
    toggleMap={toggleMap}
    isMapView={false}
    isModalView={false}
    searchParams={{}}
    onFieldChange={onFieldChange}
    onParamsRemove={onParamsRemove}
  />
))
  .add('Modal View', () => (
    <CommunityFilterList
      toggleMap={toggleMap}
      isMapView={false}
      isModalView
      searchParams={{}}
      onFieldChange={onFieldChange}
      onParamsRemove={onParamsRemove}
    />
  ))
  .add('Map View', () => (
    <CommunityFilterList
      toggleMap={toggleMap}
      isMapView
      isModalView={false}
      searchParams={{}}
      onFieldChange={onFieldChange}
      onParamsRemove={onParamsRemove}
    />
  ))
  .add('MapView & ModalView', () => (
    <CommunityFilterList
      toggleMap={toggleMap}
      isMapView
      isModalView
      searchParams={{}}
      onFieldChange={onFieldChange}
      onParamsRemove={onParamsRemove}
    />
  ));
