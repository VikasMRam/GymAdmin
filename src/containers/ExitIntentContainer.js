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

const ExitIntentContainer = InnerComponent => {
  class Wrapper extends React.Component {
    static displayName = `exitIntent(${getDisplayName(InnerComponent)})`;
    static WrappedComponent = InnerComponent;

    componentDidMount() {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        this.addMobileIntent();
      } else {
        document.addEventListener('mouseout', this.addDesktopIntent);
      }

      this.handlePopStateEvent('exitModalShown');
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
        const s = localStorage.getItem('exitModalShown');

        if (s !== 'exitShown') {
          localStorage.setItem('exitModalShown', 'exitShown');
          this.showIntent();
        }
      }
    }

    addMobileIntent = () => {
      const { showIntent } = this;
      var percentUp = 0.2;
      var scrollInterval = 100;

      var scrollStart = getBodyScrollTop();
      var pageHeight = document.documentElement.offsetHeight;

      var interval = null;
      var complete = false;

      if (pageHeight > 0) {
        // Only check the scroll position every few seconds, to avoid bogging the UI
        interval = setInterval(function () {
          var scrollAmount = scrollStart - getBodyScrollTop();
          if (scrollAmount < 0) {
            scrollAmount = 0;
            scrollStart = getBodyScrollTop();
          }

          var upScrollPercent =
            parseFloat(scrollAmount) / parseFloat(pageHeight);
          if (upScrollPercent > parseFloat(percentUp) / 100) {
            clearInterval(interval);
            interval = null;

            if (!complete) {
              showIntent();
              complete = true;
            }
          }
        }, scrollInterval);
      }
    }

    handlePopStateEvent = () => {
      const { showIntent } = this;

      if (window.matchMedia("(max-width: 2048px)").matches) {
        // Wait before setting event listener for browsers that trigger popstate at page load
        setTimeout(function () {
          window.addEventListener("popstate", function (event) {
            console.log(' event.state.intent', event.state.intent)
            if (event.state && event.state.intent === "exit-intent") {
              showIntent();
            }
          });
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

    showIntent = () => {
      const { showModal, exitIntentContent } = this.props
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
