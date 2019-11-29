import React, { Component } from 'react';
import { func, object, string } from 'prop-types';
import { matchPath, withRouter } from 'react-router';

import withUser from '../newApi/withUser';

import { host, isServer, isBrowser } from 'sly/config';
import EbookFormContainer from 'sly/containers/EbookFormContainer';
import ExitIntentQuestionFormContainer from 'sly/containers/ExitIntentQuestionFormContainer';
import SimilarCommunitiesPopupContainer from 'sly/containers/SimilarCommunitiesPopupContainer';
import withModal from 'sly/controllers/withModal';

const MOUSEOUT_TIME_DURATION = 20000;
const FOCUS_TIME_DURATION = 10000;
const EBOOK_TIME_DURATION = 120000;
const IDLE_TIME_DURATION = 10;

const MODAL_SHOWN = 'modal-shown';
const EXIT_INTENT = 'exit-intent';
const STAY_INTENT = 'stay-intent';
const IDLE = 'idle';

@withModal
@withUser
export default class RetentionPopup extends Component {
  static typeHydrationId = 'RetentionPopup';
  static propTypes = {
    showModal: func.isRequired,
    hideModal: func.isRequired,
    location: object,
    user: object,
    communityId: string,
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

    document.addEventListener('mouseout', this.onMouseoutHandler);

    this.addBlurFocusListeners();
    this.addPopstateListener();
    this.ifvisible.on('idle', this.onIdleHandler);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user && this.props.user) {
      this.removeAllEventListeners();
    }
  }

  componentWillUnmount() {
    this.removeAllEventListeners();
  }

  isEbookAvailable = () => {
    const currentTime = new Date().getTime();
    const activeTime = Math.abs(currentTime - this.renderTime);

    return activeTime >= EBOOK_TIME_DURATION;
  };

  onIdleHandler = () => {
    const idleInfo = this.ifvisible.getIdleInfo();

    if (this.isEbookAvailable() && idleInfo.isIdle) {
      this.showEbookModal(IDLE);
    } else if (idleInfo.isIdle) {
      this.ifvisible.wakeup();
    }
  };

  showEbookModal = (event) => {
    if (this.isModalShown()) {
      return;
    }

    const { hideModal } = this.props;

    this.showModal((
      <EbookFormContainer
        event={event}
        hideModal={hideModal}
      />
    ), 'eBook');
  };

  isModalShown = () => localStorage.getItem(MODAL_SHOWN) === MODAL_SHOWN || this.props.user

  onMouseoutHandler = (e) => {
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
      if (this.isEbookAvailable()) {
        this.showEbookModal(EXIT_INTENT);
      } else {
        this.showExitIntent();
      }
    }
  };

  addPopstateListener = () => {
    const { history } = window;
    const externalReferrer = document.referrer.indexOf(host) !== 0;
    const notRefreshing = !history.state || history.state.intent !== STAY_INTENT;

    if (externalReferrer && notRefreshing) {
      window.addEventListener('popstate', this.onPopstateHandler);

      history.replaceState({ intent: EXIT_INTENT }, '');
      history.pushState({ intent: STAY_INTENT }, '');
    }
  };

  onBlur = () => {
    this.lastBlur = new Date().getTime();
  };

  onFocus = () => {
    const currentTime = new Date().getTime();
    const inactiveTime = Math.abs(currentTime - this.lastBlur);

    if (inactiveTime >= FOCUS_TIME_DURATION) {
      if (this.isEbookAvailable()) {
        this.showEbookModal(EXIT_INTENT);
      } else {
        this.showExitIntent();
      }
    } else {
      this.lastBlur = currentTime;
    }
  };

  addBlurFocusListeners() {
    this.ifvisible.on('blur', this.onBlur);
    this.ifvisible.on('focus', this.onFocus);
  }

  onPopstateHandler = (event) => {
    if (event.state && event.state.intent === EXIT_INTENT) {
      this.showExitIntent();
    }
  };

  showExitIntent = () => {
    if (this.isModalShown()) {
      return;
    }

    const { hideModal, showModal, communityId } = this.props;

    let modalContent = <ExitIntentQuestionFormContainer showModal={showModal} />;


    if (communityId) {
      modalContent = <SimilarCommunitiesPopupContainer communitySlug={communityId} hideModal={hideModal} />;
    }

    this.showModal(modalContent);
  };

  showModal = (modalContent, layout) => {
    this.props.showModal(modalContent, null, layout);

    this.removeAllEventListeners();
    localStorage.setItem(MODAL_SHOWN, MODAL_SHOWN);
  }

  removeAllEventListeners = () => {
    window.removeEventListener('popstate', this.onPopstateHandler);
    document.removeEventListener('mouseout', this.onMouseoutHandler);

    this.ifvisible.off('blur', this.onBlur);
    this.ifvisible.off('focus', this.onFocus);
    this.ifvisible.off('idle', this.onIdleHandler);
  }

  render = () => null
}
