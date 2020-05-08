import React, { PureComponent } from 'react';
import { func, object, string } from 'prop-types';
import { generatePath } from 'react-router';

import {
  CUSTOMER_ROLE,
  PROVIDER_OD_ROLE,
  AGENT_ND_ROLE,
  AGENT_ADMIN_ROLE,
  PLATFORM_ADMIN_ROLE,
} from 'sly/constants/roles';
import {
  DASHBOARD_ACCOUNT_PATH,
  AGENT_DASHBOARD_FAMILIES_PATH,
  FAMILY_DASHBOARD_FAVORITES_PATH,
  AGENT_DASHBOARD_MESSAGES_PATH,
  AGENT_DASHBOARD_TASKS_PATH,
  AGENT_DASHBOARD_PROFILE_PATH, DASHBOARD_COMMUNITIES_PATH,
} from 'sly/constants/dashboardAppPaths';
import { withAuth } from 'sly/services/api';
import { withRedirectTo } from 'sly/services/redirectTo';
import { generateSearchUrl } from 'sly/services/helpers/url';
import SlyEvent from 'sly/services/helpers/events';
import AuthContainer from 'sly/services/auth/containers/AuthContainer';
import NotificationController from 'sly/controllers/NotificationController';
import Notifications from 'sly/components/organisms/Notifications';
import Header from 'sly/components/organisms/Header';
import ModalController from 'sly/controllers/ModalController';
import HowSlyWorksVideoContainer from 'sly/containers/HowSlyWorksVideoContainer';

const sendEvent = (category, action, label, value) => SlyEvent.getInstance().sendEvent({
  category,
  action,
  label,
  value,
});

const category = 'header';
const clickAction = 'click';
const toggleAction = 'toggle';
const headerItemLabel = 'headerItem';
const headerMenuLabel = 'headerMenu';
const logoLabel = 'logo';
const sendHeaderItemClickEvent = value => sendEvent(category, clickAction, headerItemLabel, value);

const defaultHeaderItems = [
  { name: 'Senior Living Resources', to: '/resources', onClick: ({ name }) => sendHeaderItemClickEvent(name) },
  { name: 'Assisted Living', to: '/assisted-living', onClick: ({ name }) => sendHeaderItemClickEvent(name) },
  //{ name: 'Nursing Homes', to: '/nursing-homes', onClick: ({ name }) => sendHeaderItemClickEvent(name) },
  { name: 'Call for help (855) 866-4515', to: 'tel:+18558664515', palette: 'primary', onClick: ({ name }) => sendHeaderItemClickEvent(name) },
];

const smallScreenMenuItems = [
  { name: 'Home', to: '/', onClick: ({ name }) => sendHeaderItemClickEvent(name) },
];

const defaultMenuItems = (user) => {
  const menuItems = [
    {
      name: 'Senior Living Resources', to: '/resources', hideInBigScreen: true, section: 2, onClick: ({ name }) => sendHeaderItemClickEvent(name),
    },
    {
      name: 'Assisted Living', to: '/assisted-living', hideInBigScreen: true, section: 2, onClick: ({ name }) => sendHeaderItemClickEvent(name),
    },
    {
      name: 'Nursing Homes', to: '/nursing-homes', hideInBigScreen: true, section: 2, onClick: ({ name }) => sendHeaderItemClickEvent(name),
    },
    {
      name: 'Call for help (855) 866-4515', to: 'tel:+18558664515', palette: 'primary', hideInBigScreen: true, section: 2, onClick: ({ name }) => sendHeaderItemClickEvent(name),
    },
    { name: 'Contact Us', to: '/contact', section: 2, onClick: ({ name }) => sendHeaderItemClickEvent(name) },
    { name: 'About Us', to: '/about', section: 2, onClick: ({ name }) => sendHeaderItemClickEvent(name) },
  ];
  return menuItems;
};

const customerMenuItems = [
  {
    name: 'Favorites', to: FAMILY_DASHBOARD_FAVORITES_PATH, section: 1, icon: 'favourite-light', onClick: ({ name }) => sendHeaderItemClickEvent(name),
  },
];

const agentMenuItems = [
  {
    name: 'My Families', to: generatePath(AGENT_DASHBOARD_FAMILIES_PATH), section: 1, icon: 'users', onClick: ({ name }) => sendHeaderItemClickEvent(name),
  },
  {
    name: 'Tasks', to: generatePath(AGENT_DASHBOARD_TASKS_PATH), section: 1, icon: 'checkbox-fill', onClick: ({ name }) => sendHeaderItemClickEvent(name),
  },
  {
    name: 'My Profile', to: AGENT_DASHBOARD_PROFILE_PATH, section: 1, icon: 'settings', onClick: ({ name }) => sendHeaderItemClickEvent(name),
  },
];

const customerAndAgentMenuItems = [
  {
    name: 'My Account', to: DASHBOARD_ACCOUNT_PATH, section: 1, icon: 'user', onClick: ({ name }) => sendHeaderItemClickEvent(name),
  },
];

const partnerCommunityMenuItems = [
  {
    name: 'Communities', to: generatePath(DASHBOARD_COMMUNITIES_PATH), section: 1, icon: 'house', onClick: ({ name }) => sendHeaderItemClickEvent(name),
  },
];

const loggedInMenuItems = (user) => {
  /* eslint-disable no-bitwise */
  let roleBasedItems = [];
  if (user) {
    const { roleID } = user;
    if (roleID & CUSTOMER_ROLE) {
      roleBasedItems = customerMenuItems;
    }
    if (roleID & AGENT_ND_ROLE) {
      roleBasedItems = agentMenuItems;
    }
    if (roleID & PROVIDER_OD_ROLE) {
      roleBasedItems = partnerCommunityMenuItems
    }
    if (roleID & (CUSTOMER_ROLE | AGENT_ND_ROLE | PROVIDER_OD_ROLE)) {
      roleBasedItems = [...roleBasedItems, ...customerAndAgentMenuItems];
    }
  }

  const loginButtonText = user
    ? 'Log Out'
    : 'Log In';

  return [...roleBasedItems, { name: loginButtonText, section: 3, onClick: ({ name }) => sendHeaderItemClickEvent(name) }];
};

const loginHeaderItems = user => user
  ? [{ name: 'My Seniorly', onClick: ({ name }) => sendHeaderItemClickEvent(name) }]
  : [{ name: 'Log In', ghost: true, isButton: true, onClick: ({ name }) => sendHeaderItemClickEvent(name) },
    { name: 'Sign Up', isButton: true, onClick: ({ name }) => sendHeaderItemClickEvent(name) }];

const generateMenuItems = user => [...defaultMenuItems(user), ...loggedInMenuItems(user)];

@withAuth
@withRedirectTo

export default class HeaderContainer extends PureComponent {
  static typeHydrationId = 'HeaderContainer';
  static propTypes = {
    user: object,
    logoutUser: func,
    ensureAuthenticated: func,
    className: string,
    redirectTo: func.isRequired,
  };

  state = { isDropdownOpen: false };

  toggleDropdown = () => {
    const { isDropdownOpen } = this.state;
    this.setState({
      isDropdownOpen: !isDropdownOpen,
    });
    sendEvent(category, toggleAction, headerMenuLabel, !isDropdownOpen);
  };

  logout = () => {
    const { logoutUser } = this.props;
    sendEvent(category, clickAction, headerItemLabel, 'Log Out');
    return logoutUser();
  };

  onLogoClick = () => {
    sendEvent(category, clickAction, logoLabel);
  };

  handleCurrentLocation = (addresses, { latitude, longitude }) => {
    const { redirectTo } = this.props;

    if (addresses.length) {
      const path = `${generateSearchUrl(['Assisted Living'], addresses[0])}?latitude=${latitude}&longitude=${longitude}`;

      redirectTo(path);
    }
  };

  render() {
    const {
      user,
      className,
      ensureAuthenticated,
    } = this.props;
    const { isDropdownOpen } = this.state;

    const hItems = defaultHeaderItems;
    const lhItems = loginHeaderItems(user);
    const menuItems = generateMenuItems(user);

    const logoutLeftMenuItem = menuItems.find(item => item.name === 'Log Out');
    if (logoutLeftMenuItem) {
      logoutLeftMenuItem.onClick = this.logout;
    }
    let loginItem = lhItems.find(item => item.name === 'Log In');
    if (loginItem) {
      loginItem.onClick = ({ name }) => { sendHeaderItemClickEvent(name); ensureAuthenticated(); };
    }
    loginItem = menuItems.find(item => item.name === 'Log In');
    if (loginItem) {
      loginItem.onClick = ({ name }) => { sendHeaderItemClickEvent(name); ensureAuthenticated(); };
    }
    let registerItem = lhItems.find(item => item.name === 'Sign Up');
    if (registerItem) {
      registerItem.onClick = ({ name }) => { sendHeaderItemClickEvent(name); ensureAuthenticated({register:true}); };
    }
    registerItem = menuItems.find(item => item.name === 'Sign Up');
    if (registerItem) {
      registerItem.onClick = ({ name }) => { sendHeaderItemClickEvent(name); ensureAuthenticated({register:true}); };
    }
    const mySlyMenuItem = lhItems.find(item => item.name === 'My Seniorly');
    if (mySlyMenuItem) {
      mySlyMenuItem.onClick = this.toggleDropdown;
    }

    const howItWorksItem = hItems.find(item => item.name === 'How It Works');

    const headerItems = [
      ...hItems,
      ...lhItems,
    ];

    const modalBody = (
      <HowSlyWorksVideoContainer isPlaying eventLabel="header" />
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
                howItWorksItem.onClick = ({ name }) => { show(modalBody, null, 'fullScreen'); sendHeaderItemClickEvent(name); };
              }
              return (
                <>
                  <Header
                    menuOpen={isDropdownOpen}
                    onMenuIconClick={this.toggleDropdown}
                    onMenuItemClick={this.toggleDropdown}
                    onHeaderBlur={this.toggleDropdown}
                    onLogoClick={this.onLogoClick}
                    headerItems={headerItems}
                    menuItems={menuItems}
                    smallScreenMenuItems={smallScreenMenuItems}
                    className={className}
                    onCurrentLocation={this.handleCurrentLocation}
                  />
                  <AuthContainer notifyInfo={notifyInfo} showModal={show} hideModal={hide} />
                  <Notifications messages={messages} dismiss={dismiss} />
                </>
              );
            }}
          </NotificationController>
        )}
      </ModalController>
    );
  }
}
