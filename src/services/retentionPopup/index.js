import React, { Component } from 'react';
import { func, object, string, bool } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { host, isServer, isBrowser } from 'sly/config';
import { withUser } from 'sly/services/newApi';
import { CUSTOMER_ROLE } from 'sly/constants/roles';
import {
  RETENTION_POPUP_IDLE_TIMEOUT,
  RETENTION_POPUP_EBOOK_TIMEOUT,
  RETENTION_POPUP_IDLE,
  RETENTION_POPUP_MODAL_SHOWN,
  RETENTION_POPUP_DISABLED_PAGES,
  RETENTION_POPUP_MOUSEOUT_TIMEOUT,
  RETENTION_POPUP_EXIT_INTENT,
  RETENTION_POPUP_STAY_INTENT,
  RETENTION_POPUP_FOCUS_TIMEOUT,
} from 'sly/constants/retentionPopup';
import withModal from 'sly/controllers/withModal';
import EbookFormContainer from 'sly/containers/EbookFormContainer';
import ExitIntentQuestionFormContainer from 'sly/containers/ExitIntentQuestionFormContainer';
import SimilarCommunitiesPopupContainer from 'sly/containers/SimilarCommunitiesPopupContainer';

@withUser
@withModal
@withRouter

export default class RetentionPopup extends Component {
  static typeHydrationId = 'RetentionPopup';
  static propTypes = {
    showModal: func.isRequired,
    hideModal: func.isRequired,
    location: object,
    user: object,
    communityId: string,
    isModalOpen: bool,
  };

  constructor(props) {
    super(props);

    if (isBrowser) {
      this.ifvisible = require('ifvisible.js');
      this.ifvisible.setIdleDuration(RETENTION_POPUP_IDLE_TIMEOUT);
    }
  }

  componentDidMount() {
    if ((this.props.user && !this.isCustomer()) || isServer || this.isModalShown()) {
      return;
    }
    this.renderTime = new Date().getTime();

    document.addEventListener('mouseout', this.onMouseoutHandler);

    this.addBlurFocusListeners();
    this.addPopstateListener();
    this.ifvisible.on('idle', this.onIdleHandler);
  }

  isCustomer = () => this.props.user && this.props.user.roleID === CUSTOMER_ROLE;

  componentDidUpdate(prevProps) {
    if (!prevProps.user && !this.isCustomer()) {
      this.removeAllEventListeners();
    }
  }

  componentWillUnmount() {
    this.removeAllEventListeners();
  }

  isEbookAvailable = () => {
    const currentTime = new Date().getTime();
    const activeTime = Math.abs(currentTime - this.renderTime);

    return activeTime >= RETENTION_POPUP_EBOOK_TIMEOUT;
  };

  onIdleHandler = () => {
    const idleInfo = this.ifvisible.getIdleInfo();

    if (this.isEbookAvailable() && idleInfo.isIdle) {
      this.showEbookModal(RETENTION_POPUP_IDLE);
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

  isModalShown = () => {
    const { isModalOpen, location: { pathname } } = this.props;

    return isModalOpen
      || localStorage.getItem(RETENTION_POPUP_MODAL_SHOWN) === RETENTION_POPUP_MODAL_SHOWN
      || (this.props.user && !this.isCustomer())
      || RETENTION_POPUP_DISABLED_PAGES.some(regex => regex.test(pathname));
  }

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

    if (!from && activeTime >= RETENTION_POPUP_MOUSEOUT_TIMEOUT) {
      if (this.isEbookAvailable()) {
        this.showEbookModal(RETENTION_POPUP_EXIT_INTENT);
      } else {
        this.showExitIntent();
      }
    }
  };

  addPopstateListener = () => {
    const { history } = window;
    const externalReferrer = document.referrer.indexOf(host) !== 0;
    const notRefreshing = !history.state || history.state.intent !== RETENTION_POPUP_STAY_INTENT;

    if (externalReferrer && notRefreshing) {
      window.addEventListener('popstate', this.onPopstateHandler);

      history.replaceState({ intent: RETENTION_POPUP_EXIT_INTENT }, '');
      history.pushState({ intent: RETENTION_POPUP_STAY_INTENT }, '');
    }
  };

  onBlur = () => {
    this.lastBlur = new Date().getTime();
  };

  onFocus = () => {
    const currentTime = new Date().getTime();
    const inactiveTime = Math.abs(currentTime - this.lastBlur);

    if (inactiveTime >= RETENTION_POPUP_FOCUS_TIMEOUT) {
      if (this.isEbookAvailable()) {
        this.showEbookModal(RETENTION_POPUP_EXIT_INTENT);
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
    if (event.state && event.state.intent === RETENTION_POPUP_EXIT_INTENT) {
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
    localStorage.setItem(RETENTION_POPUP_MODAL_SHOWN, RETENTION_POPUP_MODAL_SHOWN);
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
