import React, { Component } from 'react';
import { func } from 'prop-types';
import ifvisible from 'ifvisible.js';
import { withRouter, matchPath } from 'react-router-dom';
import { query, prefetch, withAuth, withApi } from 'sly/services/newApi';

import { host } from 'sly/config';

const FOCUS_THRESHOLD_TIME = 10000;
const MOUSEOUT_THRESHOLD_TIME = 20000;
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
const PROFILE_PAGE_PATH = `/:toc(${careTypes})/:state/:city/:communitySlug`;

const getCommunitySlug = match => match.params.communitySlug;

@withRouter

@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: getCommunitySlug(match),
  include: 'similar-communities,questions,agents',
}))
// @connect(mapStateToProps)

export default class RetentionPopups extends Component {
  static propTypes = {
    showModal: func.isRequired,
  };
  constructor(props) {
    super(props);

    this.ifvisible = ifvisible;

    this.props.history.listen((location) => {
      console.log('\n\n\n----------history', location);
      this.manageProfilePageListeners(location);
    });
  }

  componentDidMount() {
    this.manageProfilePageListeners(this.props.location);
    this.props.history.listen(this.manageProfilePageListeners);
    // console.log('\n\ndid mount', pathname, isProfilePage && isProfilePage.isExact);
    console.log('did mount', this.props.community);
    // this.addBlurFocusListeners();
    // this.addPopstateListener();
    // this.addMouseoutListener();
  }

  manageProfilePageListeners =(location) => {
    if (this.isProfilePage(location)) {
      console.log('add profile page listeners');
      if (localStorage.getItem(MODAL_SHOWN) === MODAL_SHOWN) {
        return;
      }
      this.addBlurFocusListeners();
      this.addPopstateListener();
      this.addMouseoutListener();
    } else {
      console.log('remove profile');
      this.removeListeners();
    }
  }

  isProfilePage =(location) => {
    console.log('is profile ', location.pathname, PROFILE_PAGE_PATH);
    const match = matchPath(location.pathname, PROFILE_PAGE_PATH);
    console.log(match);
    return match &&  match.isExact;
  }

  componentWillUnmount() {
    console.log('\n\nunmount ');

    // this.removeListeners();
  }

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

  addMouseoutListener = () => {
    this.renderCompleteTime = new Date().getTime();
    document.addEventListener('mouseout', this.onMouseout);
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

  addBlurFocusListeners() {
    this.ifvisible.on('blur', this.blur);
    this.ifvisible.on('focus', this.focus);
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

  showIntent = () => {
    const { showModal, exitIntentContent } = this.props;

    if (localStorage.getItem(MODAL_SHOWN) === MODAL_SHOWN) {
      return;
    }

    localStorage.setItem(MODAL_SHOWN, MODAL_SHOWN);
    showModal(exitIntentContent);
    this.removeListeners();
  };

  removeListeners() {
    window.removeEventListener('popstate', this.onPopstate);
    document.removeEventListener('mouseout', this.onMouseout);


    this.ifvisible.off('blur', this.blur);
    this.ifvisible.off('focus', this.focus);
  }

  render() {
    return (
      <div />
    );
  }
}
