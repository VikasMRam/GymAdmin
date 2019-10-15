import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

function getBodyScrollTop() {
  var el = document.scrollingElement || document.documentElement;
  return el.scrollTop;
}

const ExitIntentStore = {
  key: "isExitModalShown",
  value: "exitShown"
}

const ExitIntentContainer = InnerComponent => {
  class Wrapper extends React.Component {
    static displayName = `exitIntent(${getDisplayName(InnerComponent)})`;
    static WrappedComponent = InnerComponent;
    scrollInterval = null;

    componentDidMount() {
      if (this.isMobile()) {
        this.addMobileIntent();
        this.handlePopStateEvent();
      } else {
        document.addEventListener('mouseout', this.addDesktopIntent);
      }
    }

    componentWillUnmount() {
      if (this.isMobile()) {
        window.removeEventListener('popstate', this.setPopstateEvent);
        if (this.interval) {
          clearInterval(this.interval);
        }
      } else {
        document.removeEventListener('mouseout', this.addDesktopIntent);
      }
    }

    isMobile = () => {
      return window.innerWidth < 768;
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
    }

    addMobileIntent = () => {
      const { showIntent } = this;
      const percentUp = 0.2;
      const scrollInterval = 100;
      const pageHeight = document.documentElement.offsetHeight;

      let scrollStart = getBodyScrollTop();
      let interval = null;

      if (pageHeight > 0) {
        // Only check the scroll position every few seconds, to avoid bogging the UI
        interval = setInterval(function () {
          let scrollAmount = scrollStart - getBodyScrollTop();
          if (scrollAmount < 0) {
            scrollAmount = 0;
            scrollStart = getBodyScrollTop();
          }

          const upScrollPercent =
            parseFloat(scrollAmount) / parseFloat(pageHeight);

          if (upScrollPercent > parseFloat(percentUp) / 100) {
            clearInterval(interval);
            interval = null;
            showIntent();
          }
        }, scrollInterval);
      }
      this.interval = interval;
    }

    handlePopStateEvent = () => {
      const { setPopstateEvent } = this;

      if (window.matchMedia("(max-width: 2048px)").matches) {
        // Wait before setting event listener for browsers that trigger popstate at page load
        setTimeout(function () {
          window.addEventListener("popstate", setPopstateEvent);
        }, 100);

        // Do not rewrite state in case of refresh
        if (
          !window.history.state ||
          window.history.state.intent !== "normal-intent"
        ) {
          window.history.replaceState({ intent: "exit-intent" }, "");
          window.history.pushState({ intent: "normal-intent" }, "");
        }
      }
    }

    setPopstateEvent = (event) => {
      const { showIntent } = this;

      if (event.state && event.state.intent === "exit-intent") {
        showIntent();
      }
    }

    showIntent = () => {
      let isExitIntentShown = localStorage.getItem(ExitIntentStore.key) === ExitIntentStore.value;

      if (isExitIntentShown) {
        return;
      }

      const { showModal, exitIntentContent } = this.props

      localStorage.setItem(ExitIntentStore.key, ExitIntentStore.value);
      showModal(exitIntentContent);
    }

    render() {
      return <InnerComponent {...this.props} />;
    }
  }

  hoistNonReactStatic(Wrapper, InnerComponent);

  return Wrapper;
}

export default ExitIntentContainer;
