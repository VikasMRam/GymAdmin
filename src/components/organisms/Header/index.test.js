import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Header, { HeaderMenu, HeaderMenuItem, SeniorlyIconMenu, HeaderItems } from '.';

const headerItems = [
  { name: 'List on Seniorly', url: '#' },
  { name: 'Help Center', url: '#' },
  { name: 'Saved', url: '#' },
  { name: 'Sign Up', url: '#' },
  { name: 'Login', url: '#' },
];
const menuItems = [
  { name: 'Assisted Living', url: '#' },
  { name: "Alzheimer's Care", url: '#' },
  { name: 'Respite Care', url: '#' },
  { name: 'About Us', url: '#' },
  { name: 'Contact', url: '#' },
  { name: 'Careers', url: '#' },
  { name: 'List on Seniorly', url: '#' },
  { name: 'Sign Out', url: '#' },
];

const wrap = (props = {}) => shallow(<Header headerItems={headerItems} menuItems={menuItems} {...props} />);

it('renders children when passed in', () => {
  const wrapper = wrap({ children: 'test' });
  expect(wrapper.contains('test')).toBe(false);
});

it('does not render menu when flag is not set ', () => {
  const props = {
    menuOpen: false,
  };
  const wrapper = wrap(props);
  expect(wrapper.find(HeaderMenu)).toHaveLength(0);
});

it('renders menu when flag is set', () => {
  const props = {
    menuOpen: true,
  };
  const wrapper = wrap(props);
  expect(wrapper.find(HeaderMenu)).toHaveLength(1);
  expect(wrapper.find(HeaderMenuItem)).toHaveLength(menuItems.length);
});

it('toggles menu when clicked on Menu Icon', () => {
  const onMenuIconClick = sinon.spy();
  const props = {
    onMenuIconClick,
  };
  const wrapper = wrap(props);
  const iconMenu = wrapper.find(SeniorlyIconMenu);

  iconMenu.simulate('click');
  expect(onMenuIconClick.calledOnce);
});

it('closes menu when clicked on menu item', () => {
  const onMenuItemClick = sinon.spy();
  const props = {
    menuOpen: true,
    onMenuItemClick,
  };
  const wrapper = wrap(props);
  const menuItem = wrapper.find(HeaderMenuItem).first();

  menuItem.simulate('click');
  expect(onMenuItemClick.calledOnce);
});

it('closes menu when focus changes to element outside dropdown', () => {
  const onHeaderBlur = sinon.spy();
  const props = {
    menuOpen: true,
    onHeaderBlur,
  };
  const wrapper = wrap(props);
  const headerItems = wrapper.find(HeaderItems);

  headerItems.simulate('click');
  expect(onHeaderBlur.calledOnce);
});
