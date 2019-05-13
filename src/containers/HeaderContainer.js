import React, { Component, Fragment } from 'react';
import { func, object, string } from 'prop-types';

import { CUSTOMER_ROLE, AGENT_ROLE } from 'sly/constants/roles';
import { FAMILY_DASHBOARD_FAMILIES_PATH, FAMILY_DASHBOARD_FAVORITES_PATH, FAMILY_DASHBOARD_PROFILE_PATH } from 'sly/constants/dashboardAppPaths';
import SlyEvent from 'sly/services/helpers/events';
import AuthContainer from 'sly/containers/AuthContainer';
import NotificationController from 'sly/controllers/NotificationController';
import Notifications from 'sly/components/organisms/Notifications';
import Header from 'sly/components/organisms/Header';
import ModalController from 'sly/controllers/ModalController';
import HowSlyWorksVideo from 'sly/components/organisms/HowSlyWorksVideo';
import { withAuth } from 'sly/services/newApi';

const defaultHeaderItems = [
  { name: 'Call for help (855) 866-4515', href: 'tel:+18558664515', palette: 'primary' },
  { name: 'Resources', href: '/resources' },
  { name: 'How It Works' },
];

const smallScreenMenuItems = [
  { name: 'Home', href: '/' },
];

const defaultMenuItems = [
  {
    name: 'Call for help (855) 866-4515', href: 'tel:+18558664515', palette: 'primary', hideInBigScreen: true, section: 2,
  },
  {
    name: 'Resources', href: '/resources', hideInBigScreen: true, section: 2,
  },
  { name: 'Contact Us', href: '/contact', section: 2 },
  { name: 'About Us', href: '/about', section: 2 },
];

const customerMenuItems = [
  {
    name: 'Favorites', href: FAMILY_DASHBOARD_FAVORITES_PATH, section: 1, icon: 'favourite-light',
  },
  {
    name: 'My Profile', href: FAMILY_DASHBOARD_PROFILE_PATH, section: 1, icon: 'user',
  },
];

const agentMenuItems = [
  {
    name: 'My Families', href: FAMILY_DASHBOARD_FAMILIES_PATH, section: 1, icon: 'users',
  },
];

const loggedInMenuItems = (user) => {
  let roleBasedItems = [];
  if (user) {
    const { roleID } = user;
    if (roleID === CUSTOMER_ROLE) {
      roleBasedItems = customerMenuItems;
    }
    if (roleID === AGENT_ROLE) {
      roleBasedItems = agentMenuItems;
    }
    roleBasedItems = [...roleBasedItems, { name: 'Log Out', section: 3 }];
  } else {
    roleBasedItems = [...roleBasedItems, { name: 'Sign in', section: 3 }];
  }
  return roleBasedItems;
};

const loginHeaderItems = user => user
  ? [{ name: 'My Seniorly' }]
  : [{ name: 'Sign in', isButton: true }];

const generateMenuItems = user => [...defaultMenuItems, ...loggedInMenuItems(user)];

const sendEvent = (category, action, label, value) => SlyEvent.getInstance().sendEvent({
  category,
  action,
  label,
  value,
});

@withAuth

export default class HeaderContainer extends Component {
  static propTypes = {
    user: object,
    logoutUser: func,
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

  logout = () => {
    const { logoutUser } = this.props;
    return logoutUser();
  };

  render() {
    const {
      user,
      className,
      ensureAuthenticated,
    } = this.props;
    const { isDropdownOpen } = this.state;
    const { toggleDropdown, logout } = this;

    const hItems = defaultHeaderItems;
    const lhItems = loginHeaderItems(user);
    const menuItems = generateMenuItems(user);

    const logoutLeftMenuItem = menuItems.find(item => item.name === 'Log Out');
    if (logoutLeftMenuItem) {
      logoutLeftMenuItem.onClick = logout;
    }
    let loginItem = lhItems.find(item => item.name === 'Sign in');
    if (loginItem) {
      loginItem.onClick = () => ensureAuthenticated(() => {});
    }
    loginItem = menuItems.find(item => item.name === 'Sign in');
    if (loginItem) {
      loginItem.onClick = () => ensureAuthenticated(() => {});
    }
    const mySlyMenuItem = lhItems.find(item => item.name === 'My Seniorly');
    if (mySlyMenuItem) {
      mySlyMenuItem.onClick = toggleDropdown;
    }

    const howItWorksItem = hItems.find(item => item.name === 'How It Works');

    const headerItems = [
      ...hItems,
      ...lhItems,
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
                    smallScreenMenuItems={smallScreenMenuItems}
                    className={className}
                  />
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
