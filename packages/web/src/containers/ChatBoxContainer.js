import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';

import ChatBox from 'sly/components/organisms/ChatBox';
import { toggleChatBoxFooterReached } from 'sly/store/actions';
import { hasChatBoxFooterReached } from 'sly/store/selectors';

class ChatBoxContainer extends Component {
  static propTypes = {
    footerReached: bool,
    dispatchToggleAction: func,
  };

  componentDidMount() {
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { dispatchToggleAction, footerReached } = this.props;
    const isFooterReached = (window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight - 60);

    // Important: don't trigger rerender unnecessarily
    if (isFooterReached !== footerReached) {
      dispatchToggleAction();
    }
  };

  render() {
    const { footerReached } = this.props;

    return (
      <ChatBox footerReached={footerReached} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    footerReached: hasChatBoxFooterReached(state),
  };
};

const mapDispatchToProps = {
  dispatchToggleAction: toggleChatBoxFooterReached,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoxContainer);
