import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { matchPath, withRouter } from 'react-router';
import ifvisible from 'ifvisible.js';

import EbookFormContainer from 'sly/containers/EbookFormContainer';
import ExitIntentQuestionFormContainer from 'sly/containers/ExitIntentQuestionFormContainer';
import SimilarCommunitiesPopupContainer from 'sly/containers/SimilarCommunitiesPopupContainer';
import { host } from 'sly/config';
import withModal from 'sly/controllers/withModal';

import SlyEvent from '../helpers/events';
import withUser from '../newApi/withUser';

const MOUSEOUT_TIME_DURATION = 20000;
const FOCUS_TIME_DURATION = 10000;
const EBOOK_TIME_DURATION = 20000; // @todo change duration after testing
const IDLE_TIME_DURATION = 10;

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

ifvisible.setIdleDuration(IDLE_TIME_DURATION);

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

  componentDidMount() {
    if (this.props.user) {
      return;
    }

    this.renderTime = new Date().getTime();

    console.log('render time', this.renderTime, this.referrer);
    // console.log('hstory', this.props.history);

    if (!this.isModalShown()) {
      this.addBlurFocusListeners();
      this.addPopstateListener();
      this.addMouseoutListener();

      ifvisible.on('idle', this.idleHandler);
    }
  }

  componentWillUnmount() {
    this.removeALlEventListeners();
  }

  idleHandler = () => {
    const currentTime = new Date().getTime();
    const activeTime = Math.abs(currentTime - this.renderTime);

    console.log('idleHandler time', currentTime, this.renderTime, activeTime);

    if (activeTime >= EBOOK_TIME_DURATION) {
      this.showEbookModal();
    } else {
      ifvisible.wakeup();
    }
  }

  showEbookModal = () => {
    if (this.isModalShown()) {
      return;
    }

    const { location: { pathname } } = this.props;

    this.showModal(<EbookFormContainer
      pathname={pathname}
      sendEvent={sendEvent} />, 'eBook');
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

    console.log('\n\n addPopstateListener ', document.referrer);

    const externalReferrer = document.referrer.indexOf(host) !== 0;
    const notRefreshing = !history.state || history.state.intent !== STAY_INTENT;

    if (externalReferrer && notRefreshing) {
      window.addEventListener('popstate', this.popstateHandler);

      history.replaceState({ intent: EXIT_INTENT }, '');
      history.pushState({ intent: STAY_INTENT }, '');
    }
  };

  addMouseoutListener = () => {
    document.addEventListener('mouseout', this.mouseoutHandler);
  }

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
    ifvisible.on('blur', this.blur);
    ifvisible.on('focus', this.focus);
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

    ifvisible.off('blur', this.blur);
    ifvisible.off('focus', this.focus);
    ifvisible.off('idle', this.idleHandler);
  }

  render = () => null
}
