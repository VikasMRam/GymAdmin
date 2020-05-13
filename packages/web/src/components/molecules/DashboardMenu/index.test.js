import React from 'react';
import { shallow } from 'enzyme';

import DashboardMenu from 'sly/web/components/molecules/DashboardMenu';

const menuItems = [
  {
    label: 'Favorites', icon: 'favourite-light', iconSize: 'regular', palette: 'slate', variation: 'base', active: true, role: 2,
  },
  {
    label: 'Profile', icon: 'user', iconSize: 'regular', palette: 'slate', variation: 'filler', role: 23,
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
    const menuItemComponents = wrapper.find('MenuItemIcon');
    expect(menuItemComponents).toHaveLength(menuItems.length);
  });

  it('correct roles are passed to menu items', () => {
    const wrapper = wrap({ menuItems });
    const roleComponents = wrapper.children().filter('.role');
    expect(roleComponents).toHaveLength(menuItems.length);
    roleComponents.forEach((c, i) => {
      expect(c.prop('is')).toBe(menuItems[i].role);
    });
  });

  it('handles MenuItem Click', () => {
    const index = 0;
    const newMenuItems = menuItems.slice();
    const menuItemOnClick = jest.fn();
    newMenuItems[index].onClick = menuItemOnClick;
    const wrapper = wrap({ menuItems: newMenuItems });
    const menuItemComponents = wrapper.find('ActiveMenuItem');
    menuItemComponents.at(index).simulate('click');
    expect(menuItemOnClick).toHaveBeenCalled();
  });
});
