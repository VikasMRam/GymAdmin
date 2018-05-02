import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';

import Header, { HeaderMenu, HeaderMenuItem, SeniorlyIconMenu } from '.';

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

const wrap = (props = {}) =>
  shallow(<Header headerItems={headerItems} menuItems={menuItems} {...props} />);

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

class HeaderWithState extends Component {
  state = {
    menuOpen: false,
  };
  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  };
  render() {
    return (
      <Header
        menuOpen={this.state.menuOpen}
        onMenuIconClick={this.toggleMenu}
        headerItems={headerItems}
        menuItems={menuItems}
      />
    );
  }
}

it('toggles menu when clicked on Menu Icon', () => {
  const wrapper = mount(<HeaderWithState />);
  const iconMenu = wrapper.find(SeniorlyIconMenu);

  expect(wrapper.state()).toEqual({ menuOpen: false });
  iconMenu.simulate('click');
  expect(wrapper.state()).toEqual({ menuOpen: true });
  iconMenu.simulate('click');
  expect(wrapper.state()).toEqual({ menuOpen: false });
});
