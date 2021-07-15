import React from 'react';
import { shallow } from 'enzyme';

import DashboardMenu, { menuItems } from 'sly/web/components/molecules/DashboardMenu';
import Role from 'sly/web/components/common/Role';

const defaultProps = { activeMenuItem: 'Families' };
const wrap = (props = {}) => shallow(<DashboardMenu {...defaultProps} {...props} />);

describe('DashboardMenu', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ activeMenuItem: 'Families', children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders DashboardMenu', () => {
    const wrapper = wrap();
    const menuItemComponents = wrapper.find('Link');
    expect(menuItemComponents).toHaveLength(12);
  });

  it('correct roles are passed to menu items', () => {
    const wrapper = wrap();
    const roleComponents = wrapper.find(Role);
    expect(roleComponents).toHaveLength(12);
    roleComponents.forEach((c, i) => {
      expect(c.prop('is')).toBe(menuItems[i].role);
    });
  });

  it('handles MenuItem Click', () => {
    const index = 0;
    const newMenuItems = menuItems.slice();
    const menuItemOnClick = jest.fn();
    newMenuItems[index].onClick = menuItemOnClick;
    const wrapper = wrap({ activeMenuItem: 'Calls' });
    const menuItemComponent = wrapper.find({ palette: 'primary' });
    expect(menuItemComponent.find('Span').contains('Calls'));
  });
});
