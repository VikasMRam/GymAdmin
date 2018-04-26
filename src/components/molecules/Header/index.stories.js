import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import Header from '.';

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

class HeaderWithState extends Component {
  state = {
    menuOpen: false,
  };
  onMenuIconClick = () => {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  };
  render() {
    return (
      <Header
        menuOpen={this.state.menuOpen}
        onMenuIconClick={this.onMenuIconClick}
        headerItems={headerItems}
        menuItems={menuItems}
      />
    );
  }
}

storiesOf('Molecules|Header', module)
  .add('default', () => (
    <Header headerItems={headerItems} menuItems={menuItems} />
  ))
  .add('Menu Open', () => (
    <Header menuOpen headerItems={headerItems} menuItems={menuItems} />
  ))
  .add('Menu Icon Click Toggle', () => <HeaderWithState />);
