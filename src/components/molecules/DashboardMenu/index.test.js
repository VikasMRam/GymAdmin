import React from 'react';
import { shallow } from 'enzyme';

import DashboardMenu from 'sly/components/molecules/DashboardMenu';

const menuItems = [
  {
    label: 'Favorites', icon: 'favourite-light', iconSize: 'regular', palette: 'slate', variation: 'base', active: true,
  },
  {
    label: 'Profile', icon: 'user', iconSize: 'regular', palette: 'slate', variation: 'filler',
  },
];

const wrap = (props = {}) => shallow(<DashboardMenu {...props} />);

describe('DashboardMenu', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ menuItems, children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders DashboardMenu', () => {
    const wrapper = wrap({ menuItems });
    const menuItemComponents = wrapper.find('MenuItem');
    expect(menuItemComponents).toHaveLength(2);
  });

  it('handles MenuItem Click', () => {
    const index = 0;
    const newMenuItems = menuItems.slice();
    const menuItemOnClick = jest.fn();
    newMenuItems[index].onClick = menuItemOnClick;
    const wrapper = wrap({ menuItems: newMenuItems });
    const menuItemComponents = wrapper.find('MenuItem');
    menuItemComponents.at(index).simulate('click');
    expect(menuItemOnClick).toHaveBeenCalled();
  });

  it('handles MenuIcon Click', () => {
    const menuIconOnClick = jest.fn();
    const wrapper = wrap({ menuItems, onMenuIconClick: menuIconOnClick });
    const menuIconComponent = wrapper.find('MenuIcon');
    expect(menuIconComponent).toHaveLength(1);
    menuIconComponent.simulate('click');
    expect(menuIconOnClick).toHaveBeenCalled();
  });
});
