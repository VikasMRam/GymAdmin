import React, { Component } from 'react';

import ChatBox from 'sly/web/components/organisms/ChatBox';

export default class ChatBoxContainer extends Component {
  state = {
    footerReached: false,
  };

  componentDidMount() {
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { footerReached } = this.state;
    const isFooterReached = (window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight - 60);

    // Important: don't trigger rerender unnecessarily
    if (isFooterReached !== footerReached) {
      this.setState({
        footerReached: !footerReached,
      });
    }
  };

  render() {
    const { footerReached } = this.state;

    return (
      <ChatBox footerReached={footerReached} />
    );
  }
}
