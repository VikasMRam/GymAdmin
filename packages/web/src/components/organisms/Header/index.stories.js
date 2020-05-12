import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

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

storiesOf('Organisms|Header', module)
  .add('default', () => (
    <Header headerItems={headerItems} menuItems={menuItems} />
  ))
  .add('Menu Open', () => (
    <Header menuOpen headerItems={headerItems} menuItems={menuItems} />
  ))
  .add('Menu Icon Click Toggle', () => <HeaderWithState />);
