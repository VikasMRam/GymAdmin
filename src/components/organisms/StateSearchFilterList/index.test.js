import React from 'react';
import { shallow } from 'enzyme';

import StateSearchFilterList from 'sly/components/organisms/StateSearchFilterList';

const seoLinks = [
  { to: 'seoLink_to1', title: 'seoLink_title1' },
  { to: 'seoLink_to2', title: 'seoLink_title2' },
];

const toggleMap = jest.fn();
const onToggleModalFilterPanel = jest.fn();

const defaultProp = {
  seoLinks,
  toggleMap,
  onToggleModalFilterPanel,
};

const wrap = (props = {}) =>
  shallow(<StateSearchFilterList {...defaultProp} {...props} />);

describe('StateSearchFilterList', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
    expect(wrapper.find('StyledLink')).toHaveLength(2);
  });

  it('renders within modal', () => {
    const wrapper = wrap({ isModalView: true });
    expect(wrapper.contains('test')).toBe(false);
    expect(wrapper.find('StyledLink')).toHaveLength(2);
  });

  it('handles toggleMap', () => {
    const wrapper = wrap({ });
    const iconButton = wrapper.find('IconButton');
    expect(iconButton).toHaveLength(1);
    expect(iconButton.children().text()).toEqual('View Map');
    iconButton.simulate('click');
    expect(toggleMap).toHaveBeenCalled();
  });

  it('handles toggleMap in map view', () => {
    const wrapper = wrap({ isMapView: true });
    const iconButton = wrapper.find('IconButton');
    expect(iconButton).toHaveLength(1);
    expect(iconButton.children().text()).toEqual('View List');
    iconButton.simulate('click');
    expect(toggleMap).toHaveBeenCalled();
  });
});
