import React from 'react';
import { shallow } from 'enzyme';
// import { Marker, InfoWindow } from 'react-google-maps';

import CommunityFilterBar, { FilterButton, ClearAllButton } from '.';

jest.mock('sly/services/search/withGenerateFilterLinkPath', () => (Component) => {
  return (props) => <Component {...props} generateFilterLinkPath={() => 'path'} />;
});

const wrap = (props = {}) => shallow(<CommunityFilterBar {...props} />).dive();
const fullSp = {
  size: 'small',
  budget: 3000,
};
const halfSp = {
  size: 'small',
};
const onParamsRemove = () => {};
const props = {
  searchParams: {},
  onParamsRemove,
};

it('renders Filterbar with no filters selected', () => {
  const wrapper = wrap(props);

  expect(wrapper.find(FilterButton)).toHaveLength(0);
  expect(wrapper.find(ClearAllButton)).toHaveLength(0);
  // TODO find what's happening here
  // expect(wrapper.find(<div></div>)).toHaveLength(1);
});

it('renders Filterbar button and clear all with one filter selected', () => {
  const wrapper = wrap({ searchParams: halfSp, onParamsRemove });

  expect(wrapper.find(FilterButton)).toHaveLength(1);
  expect(wrapper.find(ClearAllButton)).toHaveLength(1);
});

it('renders Filterbar button and clear all with two filters selected', () => {
  const wrapper = wrap({ searchParams: fullSp, onParamsRemove });
  expect(wrapper.find(FilterButton)).toHaveLength(2);
  expect(wrapper.find(ClearAllButton)).toHaveLength(1);
});

    // it('renders InfoWindow when a Marker is clicked', () => {
//   const wrapper = wrap(props);
//   wrapper
//     .find(Marker)
//     .at(0)
//     .simulate('click');
//   expect(wrapper.find(InfoWindow)).toHaveLength(1);
//   wrapper.find(InfoWindow).simulate('closeClick');
//   expect(wrapper.find(InfoWindow)).toHaveLength(0);
// });
//
// it('renders only one InfoWindow at a time', () => {
//   const wrapper = wrap(props);
//   wrapper
//     .find(Marker)
//     .at(0)
//     .simulate('click');
//   wrapper
//     .find(Marker)
//     .at(1)
//     .simulate('click');
//   expect(wrapper.find(InfoWindow)).toHaveLength(1);
// });
