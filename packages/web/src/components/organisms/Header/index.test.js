import React from 'react';
import { shallow, mount } from 'enzyme';

import Header from 'sly/web/components/organisms/Header';

const headerItems = [
  { name: 'List on Seniorly', href: '#' },
  { name: 'Help Center', href: '#' },
  { name: 'Saved', href: '#' },
  { name: 'Sign Up', href: '#' },
  { name: 'Login', href: '#' },
];
const menuItems = [
  { name: 'Assisted Living', href: '#' },
  { name: 'Memory Care', href: '#' },
  { name: 'Respite Care', href: '#' },
  { name: 'About Us', href: '#' },
  { name: 'Contact', href: '#' },
  { name: 'Careers', href: '#' },
  { name: 'List on Seniorly', href: '#' },
  { name: 'Sign Out', href: '#' },
];

const wrap = (props = {}, useMount) => {
  const component = (
    <Header headerItems={headerItems} menuItems={menuItems} {...props} />
  );

  // mount is requied for some tests that want event bubbling, blur etc
  if (useMount) {
    return mount(component);
  }

  return shallow(component);
};

const assignOnClick = (items, onClick) => {
  items.forEach((item) => {
    item.onClick = onClick;
  });
  return items;
};

describe.skip('Header', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('does not render menu when flag is not set ', () => {
    const props = {
      menuOpen: false,
    };
    const wrapper = wrap(props);
    expect(wrapper.find('HeaderMenu')).toHaveLength(0);
  });

  it('renders menu when flag is set', () => {
    const props = {
      menuOpen: true,
    };
    const wrapper = wrap(props);
    expect(wrapper.find('HeaderMenu')).toHaveLength(1);
    expect(wrapper.find('HeaderMenuItem')).toHaveLength(menuItems.length);
  });

  it('toggles menu when clicked on Menu Icon', () => {
    const onMenuIconClick = jest.fn();
    const props = {
      onMenuIconClick,
    };
    const wrapper = wrap(props);
    const iconMenu = wrapper.find('[data-testid="MenuIcon"]');

    iconMenu.simulate('click');
    expect(onMenuIconClick).toHaveBeenCalled();
  });

  it('closes menu when clicked on menu item', () => {
    const onMenuItemClick = jest.fn();
    const onClick = jest.fn();
    const items = assignOnClick(menuItems, onClick);
    const props = {
      menuOpen: true,
      onMenuItemClick,
      menuItems: items,
    };
    // use mount here as this is testing event bubbling
    const wrapper = wrap(props, true);
    const menuItem = wrapper.find('HeaderMenuItem').first();

    menuItem.simulate('click');
    expect(onMenuItemClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalled();
  });

  it('closes menu when focus changes to element outside dropdown', () => {
    const onHeaderBlur = jest.fn();
    const props = {
      menuOpen: true,
      onHeaderBlur,
    };
    // use mount here as this is testing blur
    const wrapper = wrap(props, true);

    wrapper.simulate('blur');
    expect(onHeaderBlur).toHaveBeenCalled();
  });
});
