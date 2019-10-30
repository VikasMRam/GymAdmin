import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { matchPath, withRouter } from 'react-router';
import ifvisible from 'ifvisible.js';

import SlyEvent from '../helpers/events';
import withUser from '../newApi/withUser';

import EbookFormContainer from 'sly/containers/EbookFormContainer';
import ExitIntentQuestionFormContainer from 'sly/containers/ExitIntentQuestionFormContainer';
import SimilarCommunitiesPopupContainer from 'sly/containers/SimilarCommunitiesPopupContainer';
import { host } from 'sly/config';

const SHOW_EBOOK_THRESHOLD_TIME = 5000;
const MOUSEOUT_THRESHOLD_TIME = 20000;
const FOCUS_THRESHOLD_TIME = 10000;

const SEND_EBOOK = 'send-ebook';
const MODAL_SHOWN = 'modal-shown';
const EXIT_INTENT = 'exit-intent';
const STAY_INTENT = 'stay-intent';

const careTypes = [
  'retirement-community',
  'assisted-living',
  'independent-living',
  'board-and-care-home',
  'memory-care',
  'continuing-care-retirement-community',
].join('|');

const COMMUNITY_PROFILE_PAGE_PATH = `/:toc(${careTypes})/:state/:city/:communitySlug`;

ifvisible.setIdleDuration(120); // @todo change duration after testing

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

      // ifvisible.on('idle', this.removeListeners);
      ifvisible.on('wakeup', this.addActiveListener);
    }
    if (!this.isExitIntentShown()) {
      console.log('add exit intent listeners');
      this.addBlurFocusListeners();
      this.addPopstateListener();
      this.addMouseoutListener();
    }
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

    localStorage.setItem(SEND_EBOOK, SEND_EBOOK);
    showModal(<EbookFormContainer showModal={showModal} hideModal={hideModal} pathname={pathname} />, null, 'noPadding', false);

    this.removeEbookEventListeners();

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
    if (localStorage.getItem(MODAL_SHOWN) === MODAL_SHOWN) {
      return;
    }

    const { hideModal, showModal, location: { pathname } } = this.props;
    const match = matchPath(pathname, {
      path: COMMUNITY_PROFILE_PAGE_PATH,
      exact: true,
      strict: false,
    });
    let modalContent = <ExitIntentQuestionFormContainer showModal={showModal} hideModal={hideModal} />;

    if (match) {
      const { params: { communitySlug } } = match;

      modalContent = <SimilarCommunitiesPopupContainer communitySlug={communitySlug} hideModal={hideModal} />;
    }

    showModal(modalContent);
    this.removeExitIntentEventListeners();
    localStorage.setItem(MODAL_SHOWN, MODAL_SHOWN);
  };

  removeALlListeners = () => {
    console.log('remove all listeners');
    this.removeExitIntentEventListeners();
    this.removeEbookEventListeners();
  }

  removeExitIntentEventListeners =() => {
    window.removeEventListener('popstate', this.onPopstate);
    document.removeEventListener('mouseout', this.onMouseout);

    ifvisible.off('blur', this.blur);
    ifvisible.off('focus', this.focus);
  }

  removeEbookEventListeners =() => {
    ifvisible.off('wakeup', this.addActiveListener);
    clearTimeout(this.activeListener);
  }

  render() {
    return <div />;
  }
}
