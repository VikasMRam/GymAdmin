import React, { useCallback, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { stringify, parse } from 'query-string';

import { withHydration } from 'sly/web/services/partialHydration';

import { useAuth } from 'sly/web/services/api';
import { generateSearchUrl, isInternationalPath,
  parseURLQueryParams,
  removeQueryParamFromURL,
} from 'sly/web/services/helpers/url';
import { useNotification } from 'sly/web/components/helpers/notification';
import { userIs } from 'sly/web/services/helpers/role';
import SlyEvent from 'sly/web/services/helpers/events';
import Notifications from 'sly/web/components/organisms/Notifications';
import { menuItems } from 'sly/web/components/molecules/DashboardMenu';
import Header from 'sly/web/components/organisms/Header';


const AuthContainer = withHydration(/* #__LOADABLE__ */ () => /* webpackChunkName: "authContainer" */ import('sly/common/services/auth/containers/AuthContainer'));

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

const getDefaultHeaderItems = () => {
  const items = [];

  items.push(
    { name: 'Senior Living Resources', to: '/resource-center', onClick: ({ name }) => sendHeaderItemClickEvent(name) },
    { name: 'Assisted Living', to: '/assisted-living', onClick: ({ name }) => sendHeaderItemClickEvent(name) },
  );

  return items;
};


const smallScreenMenuItems = [
  { name: 'Homepage', to: '/', onClick: ({ name }) => sendHeaderItemClickEvent(name) },
];

const defaultMenuItems = () => {
  const menuItems = [
    {
      name: 'Senior Living Resources', to: '/resource-center', hideInBigScreen: true, section: 2, onClick: ({ name }) => sendHeaderItemClickEvent(name),
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

const loggedInMenuItems = ({ user, logIn, signUp, logOut }) => {
  const items = [];

  if (user) {
    menuItems.filter(mi => userIs(user, mi.role)).forEach(mi => items.push({
      name: mi.label,
      to: mi.href,
      section: 1,
      Icon: mi.Icon,
      onClick: ({ name }) => sendHeaderItemClickEvent(name),
    }));
    items.push({ name: 'Log out', section: 3, palette: 'primary', onClick: logOut });
  } else {
    items.push({ name: 'Log in', section: 3, palette: 'primary', onClick: logIn });
    items.push({ name: 'Sign up', section: 3, palette: 'primary', onClick: signUp });
  }

  return items;
};

const getUserName = (user) => {
  const name = user.name ? user.name.split(' ')[0] : user.email;
  return name.length > 10 ? `${name.substring(0, 10)}...` : name;
};

const loginHeaderItems = ({ user, logIn, signUp, toggleDropdown }) => user
  ? [{ name: getUserName(user), isToggler: true, onClick: toggleDropdown }]
  : [{ name: 'Log In', ghost: true, isButton: true, onClick: logIn },
    { name: 'Sign Up', isButton: true, onClick: signUp }];

const generateMenuItems = ({ user, logIn, signUp, logOut }) => [
  ...defaultMenuItems(),
  ...loggedInMenuItems({ user, logIn, signUp, logOut }),
];

export default function HeaderContainer(props) {
  const location = useLocation();
  const history = useHistory();
  const { user, logoutUser, authenticated, ensureAuthenticated } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = useCallback(() => {
    setDropdownOpen(!isDropdownOpen);
    sendEvent(category, toggleAction, headerMenuLabel, !isDropdownOpen);
  }, [isDropdownOpen]);

  const { dismiss, messages } = useNotification();

  const logOut = useCallback(() => {
    sendEvent(category, clickAction, headerItemLabel, 'Log Out');
    return logoutUser();
  }, [logoutUser]);

  const onLogoClick = useCallback(() => {
    sendEvent(category, clickAction, logoLabel);
  }, []);

  const handleCurrentLocation = useCallback((addresses, { latitude, longitude }) => {
    if (addresses.length) {
      const path = `${generateSearchUrl(['Nursing Homes'], addresses[0])}`; // ?geo=${latitude},${longitude},10`;
      history.push(path);
    }
  }, []);

  const { pathname, search, hash } = location;
  const { loginRedirect } = parseURLQueryParams(search);

  useEffect(() => {
    if (!authenticated.loggingIn && loginRedirect) {
      ensureAuthenticated()
        .then(() => {
          history.push(decodeURIComponent(loginRedirect));
        })
        .catch(() => {
          const params = removeQueryParamFromURL('loginRedirect', search);
          history.replace(`${pathname}${stringify(params)}${hash}`);
        });
    }
  }, [authenticated.loggingIn, loginRedirect]);

  const isInternationalPage = isInternationalPath(pathname);

  const signUp = ({ name }) => { sendHeaderItemClickEvent(name); ensureAuthenticated({ register: true }); };
  const logIn = ({ name }) => { sendHeaderItemClickEvent(name); ensureAuthenticated(); };

  const hItems = getDefaultHeaderItems();
  const lhItems = !isInternationalPage ? loginHeaderItems({ user, logIn, signUp, toggleDropdown }) : [];
  const menuItems = isInternationalPage ? defaultMenuItems() : generateMenuItems({ user, logIn, signUp, logOut });

  const headerItems = [
    ...hItems,
    ...lhItems,
  ];

  return (
    <>
      <Header
        menuOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        onLogoClick={onLogoClick}
        headerItems={headerItems}
        menuItems={menuItems}
        smallScreenMenuItems={smallScreenMenuItems}
        onCurrentLocation={handleCurrentLocation}
      />
      <AuthContainer />
      <Notifications messages={messages} dismiss={dismiss} />
    </>
  );
}

HeaderContainer.typeHydrationId = 'HeaderContainer';

