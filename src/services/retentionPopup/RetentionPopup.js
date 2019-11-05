import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { matchPath, withRouter } from 'react-router';

import SlyEvent from '../helpers/events';
import withUser from '../newApi/withUser';

import { host, isServer, isBrowser } from 'sly/config';
import EbookFormContainer from 'sly/containers/EbookFormContainer';
import ExitIntentQuestionFormContainer from 'sly/containers/ExitIntentQuestionFormContainer';
import SimilarCommunitiesPopupContainer from 'sly/containers/SimilarCommunitiesPopupContainer';
import withModal from 'sly/controllers/withModal';
import careTypes from 'sly/constants/careTypes';

const MOUSEOUT_TIME_DURATION = 20000;
const FOCUS_TIME_DURATION = 10000;
const EBOOK_TIME_DURATION = 120000; // @todo change duration after testing
const IDLE_TIME_DURATION = 10;

const MODAL_SHOWN = 'modal-shown';
const EXIT_INTENT = 'exit-intent';
const STAY_INTENT = 'stay-intent';

const COMMUNITY_PROFILE_PAGE_PATH = `/:toc(${careTypes})/:state/:city/:communitySlug`;

const sendEvent = (action, label, value, category = 'exit-intent') => SlyEvent.getInstance().sendEvent({
  category,
  action,
  label,
  value,
});

@withModal
@withRouter
@withUser
export default class RetentionPopup extends Component {
  static propTypes = {
    showModal: func.isRequired,
    hideModal: func.isRequired,
    location: object,
    user: object,
  };

  constructor(props) {
    super(props);

    if (isBrowser) {
      this.ifvisible = require('ifvisible.js');
      this.ifvisible.setIdleDuration(IDLE_TIME_DURATION);
    }
  }


  componentDidMount() {
    if (this.props.user || isServer || this.isModalShown()) {
      return;
    }

    this.renderTime = new Date().getTime();

    this.addBlurFocusListeners();
    this.addPopstateListener();
    this.ifvisible.on('idle', this.idleHandler);

    document.addEventListener('mouseout', this.mouseoutHandler);
  }

  componentWillUnmount() {
    this.removeALlEventListeners();
  }

  idleHandler = () => {
    const currentTime = new Date().getTime();
    const activeTime = Math.abs(currentTime - this.renderTime);

    if (activeTime >= EBOOK_TIME_DURATION) {
      this.showEbookModal();
    } else {
      this.ifvisible.wakeup();
    }
  }

  showEbookModal = () => {
    if (this.isModalShown()) {
      return;
    }

    const { location: { pathname } } = this.props;

    this.showModal(<EbookFormContainer
      pathname={pathname}
      sendEvent={sendEvent}
    />, 'eBook');
  };

  isModalShown = () => localStorage.getItem(MODAL_SHOWN) === MODAL_SHOWN

  mouseoutHandler = (e) => {
    const currentTime = new Date().getTime();
    const activeTime = Math.abs(currentTime - this.renderTime);

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

    if (!from && activeTime >= MOUSEOUT_TIME_DURATION) {
      this.showExitIntent();
    }
  };

  addPopstateListener = () => {
    const { history } = window;

    const externalReferrer = document.referrer.indexOf(host) !== 0;
    const notRefreshing = !history.state || history.state.intent !== STAY_INTENT;

    if (externalReferrer && notRefreshing) {
      window.addEventListener('popstate', this.popstateHandler);

      history.replaceState({ intent: EXIT_INTENT }, '');
      history.pushState({ intent: STAY_INTENT }, '');
    }
  };

  blur = () => {
    this.lastBlur = new Date().getTime();
  };

  focus = () => {
    const currentTime = new Date().getTime();
    const inactiveTime = Math.abs(currentTime - this.lastBlur);

    if (inactiveTime >= FOCUS_TIME_DURATION) {
      this.showExitIntent();
    } else {
      this.lastBlur = currentTime;
    }
  };

  addBlurFocusListeners() {
    this.ifvisible.on('blur', this.blur);
    this.ifvisible.on('focus', this.focus);
  }

  popstateHandler = (event) => {
    if (event.state && event.state.intent === EXIT_INTENT) {
      this.showExitIntent();
    }
  };

  showExitIntent = () => {
    if (this.isModalShown()) {
      return;
    }

    const { location: { pathname }, hideModal, showModal } = this.props;
    const match = matchPath(pathname, {
      path: COMMUNITY_PROFILE_PAGE_PATH,
      exact: true,
      strict: false,
    });

    let modalContent = <ExitIntentQuestionFormContainer pathname={pathname} showModal={showModal} sendEvent={sendEvent} />;

    if (match) {
      const { params: { communitySlug } } = match;

      modalContent = <SimilarCommunitiesPopupContainer communitySlug={communitySlug} hideModal={hideModal} sendEvent={sendEvent} />;
    }

    this.showModal(modalContent);
  };

  showModal = (modalContent, layout) => {
    this.props.showModal(modalContent, null, layout);
    localStorage.setItem(MODAL_SHOWN, MODAL_SHOWN);
    this.removeALlEventListeners();
  }

  removeALlEventListeners = () => {
    window.removeEventListener('popstate', this.popstateHandler);
    document.removeEventListener('mouseout', this.mouseoutHandler);

    this.ifvisible.off('blur', this.blur);
    this.ifvisible.off('focus', this.focus);
    this.ifvisible.off('idle', this.idleHandler);
  }

  render = () => null
}
