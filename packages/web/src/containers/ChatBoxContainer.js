import React, { Component } from 'react';
import { object } from 'prop-types';
import { withRouter, matchPath } from 'react-router';

import { ENABLED_ROUTES } from 'sly/web/constants/chatbox';
import ChatBox from 'sly/web/components/organisms/ChatBox';

@withRouter

export default class ChatBoxContainer extends Component {
  static propTypes = {
    location: object,
  };

  state = {
    footerReached: false,
  };

  componentDidMount() {
    if (this.matched) {
      this.handleScroll();
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (this.matched) {
      window.removeEventListener('scroll', this.handleScroll);
    }
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
    const { location: { pathname } } = this.props;
    const { footerReached } = this.state;


    this.matched = ENABLED_ROUTES.find(r => !!matchPath(pathname, {
      path: r,
    }));
    if (this.matched) {
      return (
        <ChatBox footerReached={footerReached} />
      );
    }

    return null;
  }
}
