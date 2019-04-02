import React, { Component, Fragment } from 'react';
import { func, object, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { SAVED_COMMUNITIES } from 'sly/constants/modalType';
import { getDetail } from 'sly/store/selectors';
import SlyEvent from 'sly/services/helpers/events';
import { getSearchParams } from 'sly/services/helpers/search';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';
import { resourceDeleteRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import { ensureAuthenticated, entitiesReceive } from 'sly/store/actions';
import SavedCommunitiesPopupController from 'sly/controllers/SavedCommunitiesPopupController';
import AuthContainer from 'sly/containers/AuthContainer';
import NotificationController from 'sly/controllers/NotificationController';
import Notifications from 'sly/components/organisms/Notifications';
import Header from 'sly/components/organisms/Header';
import ModalController from 'sly/controllers/ModalController';
import HowSlyWorksVideo from 'sly/components/organisms/HowSlyWorksVideo';

const defaultHeaderItems = [
  { name: '(855) 866-4515', url: 'tel:+18558664515' },
  { name: 'Resources', url: '/resources' },
  { name: 'How It Works' },
  { name: 'Saved' },
  { name: 'List Your Property', url: '/providers' },
];

const defaultMenuItems = [
  { name: 'Home', url: '/' },
  { name: '(855) 866-4515', url: 'tel:+18558664515' },
  { name: 'Resources', url: '/resources' },
  { name: 'How It Works', url: '/how-it-works' },
  { name: 'Assisted Living', url: '/assisted-living' },
  { name: 'Memory Care', url: '/memory-care' },
  { name: 'Respite Care', url: '/respite-care' },
  { name: 'Our Company', url: '/about' },
  { name: 'Contact', url: '/contact' },
  { name: 'Careers', url: 'https://angel.co/seniorly/jobs' },
  { name: 'List on Seniorly', url: '/providers' },
];

const loginHeaderItems = user => user
  ? [{ name: 'Dashboard', url: '/mydashboard' }]
  : [{ name: 'Sign in' }];

const loginMenuItems = user => loginHeaderItems(user)
  .concat(user
    ? [{ name: 'Log out' }]
    : []);

const menuItemHrIndices = [7, 10];

const sendEvent = (category, action, label, value) => SlyEvent.getInstance().sendEvent({
  category,
  action,
  label,
  value,
});

class HeaderContainer extends Component {
  static propTypes = {
    user: object,
    setQueryParams: func,
    searchParams: object,
    logoutUser: func,
    fetchUser: func,
    history: object,
    match: object,
    location: object,
    ensureAuthenticated: func,
    className: string,
  };

  state = { isDropdownOpen: false };

  toggleDropdown = () => {
    const { isDropdownOpen } = this.state;
    this.setState({
      isDropdownOpen: !isDropdownOpen,
    });
  };

  render() {
    const {
      user,
      setQueryParams,
      logoutUser,
      fetchUser,
      className,
      ensureAuthenticated,
    } = this.props;
    const { isDropdownOpen } = this.state;
    const { toggleDropdown } = this;

    const hItems = defaultHeaderItems;
    const lhItems = loginHeaderItems(user);
    const lmItems = loginMenuItems(user);

    const savedHeaderItem = hItems.find(item => item.name === 'Saved');
    if (savedHeaderItem) {
      savedHeaderItem.onClick = () => ensureAuthenticated(() => setQueryParams({ modal: SAVED_COMMUNITIES }));
    }
    const logoutLeftMenuItem = lmItems.find(item => item.name === 'Log out');
    if (logoutLeftMenuItem) {
      logoutLeftMenuItem.onClick = () => {
        logoutUser().then(() => fetchUser());
      };
    }
    let loginItem = lhItems.find(item => item.name === 'Sign in');
    if (loginItem) {
      loginItem.onClick = () => ensureAuthenticated(() => {});
    }
    loginItem = lmItems.find(item => item.name === 'Sign in');
    if (loginItem) {
      loginItem.onClick = () => ensureAuthenticated(() => {});
    }

    const howItWorksItem = hItems.find(item => item.name === 'How It Works');

    const headerItems = [
      ...hItems,
      ...lhItems,
    ];

    const menuItems = [
      ...defaultMenuItems,
      ...lmItems,
    ];

    const modalBody = (
      <HowSlyWorksVideo
        isPlaying
        onPause={e => sendEvent('howSlyWorksVideo', e.target.ended ? 'complete' : 'pause', 'header', e.target.currentTime)}
        onPlay={e => sendEvent('howSlyWorksVideo', 'play', 'header', e.target.currentTime)}
      />
    );

    return (
      <ModalController>
        {({
          show,
          hide,
        }) => (
          <NotificationController>
            {({
              notifyInfo,
              messages,
              dismiss,
            }) => {
              if (howItWorksItem) {
                howItWorksItem.onClick = () => show(modalBody, null, 'fullScreen');
              }
              return (
                <Fragment>
                  <Header
                    menuOpen={isDropdownOpen}
                    onMenuIconClick={toggleDropdown}
                    onMenuItemClick={toggleDropdown}
                    onHeaderBlur={toggleDropdown}
                    headerItems={headerItems}
                    menuItems={menuItems}
                    menuItemHrIndices={menuItemHrIndices}
                    className={className}
                  />
                  {user !== null && <SavedCommunitiesPopupController notifyInfo={notifyInfo} />}
                  <AuthContainer notifyInfo={notifyInfo} showModal={show} hideModal={hide} />
                  <Notifications messages={messages} dismiss={dismiss} />
                </Fragment>
              );
            }}
          </NotificationController>
        )}
      </ModalController>
    );
  }
}

const mapStateToProps = (state, {
  history, match, location,
}) => ({
  setQueryParams: getQueryParamsSetter(history, location),
  searchParams: getSearchParams(match, location),
  // this will break as soon as we are requesting other users
  // TODO: make the me resource remember it's id
  user: getDetail(state, 'user', 'me'),
});

const mapDispatchToProps = dispatch => ({
  ensureAuthenticated: action => dispatch(ensureAuthenticated(action)),
  logoutUser: () => dispatch(resourceDeleteRequest('logout')),
  fetchUser: () => dispatch(resourceDetailReadRequest('user', 'me'))
    .catch(() => dispatch(entitiesReceive({ user: { me: null } }))),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));
