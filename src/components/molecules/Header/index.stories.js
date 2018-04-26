import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import Header from '.';

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
      />
    );
  }
}

storiesOf('Molecules|Header', module)
  .add('default', () => <Header />)
  .add('Menu Open', () => <Header menuOpen />)
  .add('Menu Icon Click Toggle', () => <HeaderWithState />);
