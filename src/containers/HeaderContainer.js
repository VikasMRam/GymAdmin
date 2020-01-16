import React, { PureComponent } from 'react';
import { func, object, string } from 'prop-types';
import { generatePath } from 'react-router';

import { CUSTOMER_ROLE, PROVIDER_OD_ROLE, AGENT_ND_ROLE } from 'sly/constants/roles';
import {
  AGENT_DASHBOARD_FAMILIES_PATH,
  FAMILY_DASHBOARD_FAVORITES_PATH,
  FAMILY_DASHBOARD_PROFILE_PATH,
  AGENT_DASHBOARD_MESSAGES_PATH,
  AGENT_DASHBOARD_TASKS_PATH,
  AGENT_DASHBOARD_ACCOUNT_PATH,
  AGENT_DASHBOARD_PROFILE_PATH,
} from 'sly/constants/dashboardAppPaths';
import SlyEvent from 'sly/services/helpers/events';
import AuthContainer from 'sly/containers/AuthContainer';
import NotificationController from 'sly/controllers/NotificationController';
import Notifications from 'sly/components/organisms/Notifications';
import Header from 'sly/components/organisms/Header';
import ModalController from 'sly/controllers/ModalController';
import HowSlyWorksVideoContainer from 'sly/containers/HowSlyWorksVideoContainer';
import { withAuth } from 'sly/services/newApi';

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
  { name: 'Nursing Homes', to: '/nursing-homes', onClick: ({ name }) => sendHeaderItemClickEvent(name) },
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
  if (user) {
    const { roleID } = user;
    /* eslint-disable-next-line no-bitwise */
    if (roleID & PROVIDER_OD_ROLE) {
      menuItems.unshift({ name: 'Dashboard', to: '/mydashboard', section: 2, onClick: ({ name }) => sendHeaderItemClickEvent(name) });
    }
  }
  return menuItems;
};

const customerMenuItems = [
  {
    name: 'Favorites', to: FAMILY_DASHBOARD_FAVORITES_PATH, section: 1, icon: 'favourite-light', onClick: ({ name }) => sendHeaderItemClickEvent(name),
  },
  {
    name: 'My Profile', to: FAMILY_DASHBOARD_PROFILE_PATH, section: 1, icon: 'user', onClick: ({ name }) => sendHeaderItemClickEvent(name),
  },
];

const agentMenuItems = [
  {
    name: 'My Families', to: generatePath(AGENT_DASHBOARD_FAMILIES_PATH), section: 1, icon: 'users', onClick: ({ name }) => sendHeaderItemClickEvent(name),
  },
  {
    name: 'Messages', to: generatePath(AGENT_DASHBOARD_MESSAGES_PATH), section: 1, icon: 'message', onClick: ({ name }) => sendHeaderItemClickEvent(name),
  },
  {
    name: 'Tasks', to: generatePath(AGENT_DASHBOARD_TASKS_PATH), section: 1, icon: 'checkbox-fill', onClick: ({ name }) => sendHeaderItemClickEvent(name),
  },
  {
    name: 'My Account', to: AGENT_DASHBOARD_ACCOUNT_PATH, section: 1, icon: 'settings', onClick: ({ name }) => sendHeaderItemClickEvent(name),
  },
  {
    name: 'My Profile', to: AGENT_DASHBOARD_PROFILE_PATH, section: 1, icon: 'user', onClick: ({ name }) => sendHeaderItemClickEvent(name),
  },
];

const loggedInMenuItems = (user) => {
  let roleBasedItems = [];
  if (user) {
    const { roleID } = user;
    /* eslint-disable-next-line no-bitwise */
    if (roleID & CUSTOMER_ROLE) {
      roleBasedItems = customerMenuItems;
    }
    /* eslint-disable-next-line no-bitwise */
    if (roleID & AGENT_ND_ROLE) {
      roleBasedItems = agentMenuItems;
    }
    roleBasedItems = [...roleBasedItems, { name: 'Log Out', section: 3, onClick: ({ name }) => sendHeaderItemClickEvent(name) }];
  } else {
    roleBasedItems = [...roleBasedItems, { name: 'Sign in', section: 3, onClick: ({ name }) => sendHeaderItemClickEvent(name) }];
  }
  return roleBasedItems;
};

const loginHeaderItems = user => user
  ? [{ name: 'My Seniorly', onClick: ({ name }) => sendHeaderItemClickEvent(name) }]
  : [{ name: 'Sign in', isButton: true, onClick: ({ name }) => sendHeaderItemClickEvent(name) }];

const generateMenuItems = user => [...defaultMenuItems(user), ...loggedInMenuItems(user)];

@withAuth

export default class HeaderContainer extends PureComponent {
  static typeHydrationId = 'HeaderContainer';
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
    sendEvent(category, toggleAction, headerMenuLabel, !isDropdownOpen);
  };

  logout = () => {
    const { logoutUser } = this.props;
    sendEvent(category, clickAction, headerItemLabel, 'Log Out');
    return logoutUser();
  };

  onLogoClick = () => {
    sendEvent(category, clickAction, logoLabel);
  }

  render() {
    const {
      user,
      className,
      ensureAuthenticated,
    } = this.props;
    const { isDropdownOpen } = this.state;
    const { toggleDropdown, logout, onLogoClick } = this;

    const hItems = defaultHeaderItems;
    const lhItems = loginHeaderItems(user);
    const menuItems = generateMenuItems(user);

    const logoutLeftMenuItem = menuItems.find(item => item.name === 'Log Out');
    if (logoutLeftMenuItem) {
      logoutLeftMenuItem.onClick = logout;
    }
    let loginItem = lhItems.find(item => item.name === 'Sign in');
    if (loginItem) {
      loginItem.onClick = ({ name }) => { sendHeaderItemClickEvent(name); ensureAuthenticated(() => {}); };
    }
    loginItem = menuItems.find(item => item.name === 'Sign in');
    if (loginItem) {
      loginItem.onClick = ({ name }) => { sendHeaderItemClickEvent(name); ensureAuthenticated(() => {}); };
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
                    onMenuIconClick={toggleDropdown}
                    onMenuItemClick={toggleDropdown}
                    onHeaderBlur={toggleDropdown}
                    onLogoClick={onLogoClick}
                    headerItems={headerItems}
                    menuItems={menuItems}
                    smallScreenMenuItems={smallScreenMenuItems}
                    className={className}
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
