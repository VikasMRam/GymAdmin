import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { node, func } from 'prop-types';

import { host } from 'sly/config';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

const MODAL_SHOWN = 'modal-shown';
const EXIT_INTENT = 'exit-intent';
const STAY_INTENT = 'stay-intent';

const withExitIntent = (InnerComponent) => {
  class Wrapper extends Component {
    static propTypes = {
      exitIntentContent: node.isRequired,
      showModal: func.isRequired,
    };

    static displayName = `exitIntent(${getDisplayName(InnerComponent)})`;
    static WrappedComponent = InnerComponent;

    componentDidMount() {
      this.addPopstateListener();

      //  this.addMobileIntent();
      //  this.handlePopStateEvent();
      //  document.addEventListener('mouseout', this.addDesktopIntent);
    }

    componentWillUnmount() {
      window.removeEventListener('popstate', this.onPopstate);
      // document.removeEventListener('mouseout', this.addDesktopIntent);
    }

    /* Exit Intent Work: https://github.com/mrlagmer/exitintent/blob/master/src/App.js */
    addDesktopIntent = (e) => {
      // Get the current viewport width.
      const vpWidth = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );

      // If the current mouse X position is within 50px of the right edge
      // of the viewport, return.
      if (e.clientX >= vpWidth - 50) return;

      // If the current mouse Y position is not within 50px of the top
      // edge of the viewport, return.
      if (e.clientY >= 50) return;

      // Reliable, works on mouse exiting window and
      // user switching active program
      const from = e.relatedTarget || e.toElement;

      if (!from) {
        this.showIntent();
      }
    };

    addPopstateListener = () => {
      const { history } = window;

      const externalReferrer = document.referrer.indexOf(host) !== 0;
      const notRefreshing = !history.state || history.state.intent !== STAY_INTENT;

      if (externalReferrer && notRefreshing) {
        window.addEventListener('popstate', this.onPopstate);

        history.replaceState({ intent: EXIT_INTENT }, '');
        history.pushState({ intent: STAY_INTENT }, '');
      }
    };

    onPopstate = (event) => {
      if (event.state && event.state.intent === EXIT_INTENT) {
        this.showIntent();
      }
    };

    showIntent = () => {
      const { showModal, exitIntentContent } = this.props;

      if (localStorage.getItem(MODAL_SHOWN) === MODAL_SHOWN) {
        return;
      }

      localStorage.setItem(MODAL_SHOWN, MODAL_SHOWN);
      showModal(exitIntentContent);
    };

    render() {
      return <InnerComponent {...this.props} />;
    }
  }

  hoistNonReactStatic(Wrapper, InnerComponent);

  return Wrapper;
};

export default withExitIntent;
