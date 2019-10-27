import React, { Component } from 'react';
import { func, object } from 'prop-types';
import ifvisible from 'ifvisible.js';
import { withRouter } from 'react-router';


import withUser from '../newApi/withUser';
import SlyEvent from '../helpers/events';

import { host } from 'sly/config';
import EbookFormContainer from 'sly/containers/EbookFormContainer/index';

const SHOW_EBOOK_THRESHOLD_TIME = 5000;
const MOUSEOUT_THRESHOLD_TIME = 20000;
const FOCUS_THRESHOLD_TIME = 10000;

const SEND_EBOOK = 'send-ebook';
const MODAL_SHOWN = 'modal-shown';
const EXIT_INTENT = 'exit-intent';
const STAY_INTENT = 'stay-intent';

ifvisible.setIdleDuration(120); // change duration after testing

@withRouter
@withUser
export default class RetentionPopup extends Component {
  static propTypes = {
    showModal: func.isRequired,
    hideModal: func.isRequired,
    location: object,
  };

  componentDidMount() {
    if (!this.isEbookModalShown()) {
      this.addActiveListener();

      ifvisible.on('idle', this.removeListeners);
      ifvisible.on('wakeup', this.addActiveListener);
    }
    // if (!this.isExitIntentShown()) {
    //   this.addBlurFocusListeners();
    //   this.addPopstateListener();
    //   this.addMouseoutListener();
    // }
  }

  addActiveListener = () => {
    console.log('add active listener');
    if (this.isEbookModalShown()) {
      return;
    }
    this.activeListener = setTimeout(() => {
      console.log('inside set timeout');
      const info = ifvisible.getIdleInfo();

      if (!info.isIdle) {
        this.showSendEbookModal();
      }
    }, SHOW_EBOOK_THRESHOLD_TIME);
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  isEbookModalShown = () => {
    return localStorage.getItem(SEND_EBOOK) === SEND_EBOOK;
  }

  showSendEbookModal = () => {
    if (this.isEbookModalShown()) {
      return;
    }

    const { showModal, hideModal, location: { pathname } } = this.props;
    const event = {
      action: 'open-modal', category: 'ebook', label: pathname,
    };
    console.log('\n\ninside show modal', event);

    localStorage.setItem(SEND_EBOOK, SEND_EBOOK);
    showModal(<EbookFormContainer showModal={showModal} hideModal={hideModal} pathname={pathname} />);

    this.removeListeners();

    SlyEvent.getInstance().sendEvent(event);
  };

  // Code for exit intent popup

  isExitIntentShown = () => {
    return localStorage.getItem(MODAL_SHOWN) === MODAL_SHOWN;
  }

  onMouseout = (e) => {
    const currentTime = new Date().getTime();
    const activeTime = Math.abs(currentTime - this.renderCompleteTime);

    // Get the current viewport width.
    const vpWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0,
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

    if (!from && activeTime >= MOUSEOUT_THRESHOLD_TIME) {
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

  addMouseoutListener = () => {
    this.renderCompleteTime = new Date().getTime();
    document.addEventListener('mouseout', this.onMouseout);
  }

  blur = () => {
    this.lastBlur = new Date().getTime();
  };

  focus = () => {
    const currentTime = new Date().getTime();
    const inactiveTime = Math.abs(currentTime - this.lastBlur);

    if (inactiveTime >= FOCUS_THRESHOLD_TIME) {
      this.showIntent();
    } else {
      this.lastBlur = currentTime;
    }
  };

  addBlurFocusListeners() {
    ifvisible.on('blur', this.blur);
    ifvisible.on('focus', this.focus);
  }

  onPopstate = (event) => {
    console.log('onpopstate intent');
    if (event.state && event.state.intent === EXIT_INTENT) {
      this.showIntent();
    }
  };

  showIntent = () => {
    const { showModal, location: { pathname } } = this.props;

    if (localStorage.getItem(MODAL_SHOWN) === MODAL_SHOWN) {
      return;
    }

    console.log('\n\n\nshow intent', MODAL_SHOWN, localStorage.getItem(MODAL_SHOWN));

    localStorage.setItem(MODAL_SHOWN, MODAL_SHOWN);
    showModal('exit intetnt content');
    this.removeListeners();
  };

  removeListeners = () => {
    console.log('remove listener');
    clearTimeout(this.activeListener);

    // exit intent listeners
    window.removeEventListener('popstate', this.onPopstate);
    document.removeEventListener('mouseout', this.onMouseout);

    ifvisible.off('blur', this.blur);
    ifvisible.off('focus', this.focus);
  }

  render() {
    console.log('props', this.props);
    return null;
  }
}
