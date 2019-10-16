import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { node, func } from 'prop-types';

import { host, domain } from 'sly/config';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

const ExitIntentStore = {
  key: 'isExitModalShown',
  value: 'exitShown',
};

const ExitIntent = (InnerComponent) => {
  class Wrapper extends Component {
    static propTypes = {
      exitIntentContent: node.isRequired,
      showModal: func.isRequired,
    };

    static displayName = `exitIntent(${getDisplayName(InnerComponent)})`;
    static WrappedComponent = InnerComponent;
    scrollInterval = null;

    componentDidMount() {
      console.log('\n\nReferrer', host, domain, document.referrer);
      console.log('window.history.state', window.history.state);
      // @todo change the test condition
      if (document.referrer.indexOf(host) === 0) {
        this.addPopstateListener();
      }
      // if (this.isMobile()) {
      //   this.addMobileIntent();
      //   this.handlePopStateEvent();
      // } else {
      //   document.addEventListener('mouseout', this.addDesktopIntent);
      // }
    }

    componentWillUnmount() {
      if (this.isMobile()) {
        window.removeEventListener('popstate', this.onPopstate);
        if (this.interval) {
          clearInterval(this.interval);
        }
      } else {
        document.removeEventListener('mouseout', this.addDesktopIntent);
      }
    }

    isMobile = () => window.innerWidth < 768;

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
    }

    addPopstateListener = () => {
      window.addEventListener('popstate', this.onPopstate);
      // Do not rewrite state in case of refresh
      if (
        !window.history.state ||
        window.history.state.intent !== 'normal-intent'
      ) {
        window.history.replaceState({ intent: 'exit-intent' }, '');
        window.history.pushState({ intent: 'normal-intent' }, '');
      } else {
        console.log('not installing..');
      }
      // }
    };

    onPopstate = (event) => {
      console.log('\n\n inside popstate listener');

      const { showIntent } = this;

      if (event.state && event.state.intent === 'exit-intent') {
        showIntent();
      }
    }

    showIntent = () => {
      const isExitIntentShown = localStorage.getItem(ExitIntentStore.key) === ExitIntentStore.value;

      if (isExitIntentShown) {
        return;
      }

      const { showModal, exitIntentContent } = this.props;

      localStorage.setItem(ExitIntentStore.key, ExitIntentStore.value);
      showModal(exitIntentContent);
    }

    render() {
      return <InnerComponent {...this.props} />;
    }
  }

  hoistNonReactStatic(Wrapper, InnerComponent);

  return Wrapper;
};

export default ExitIntent;
