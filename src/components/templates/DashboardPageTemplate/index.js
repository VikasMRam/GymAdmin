import React from 'react';
import { node, string, bool } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import { generatePath } from 'react-router';

import { size, palette } from 'sly/components/themes';
import {
  FAMILY_DASHBOARD_FAVORITES_PATH,
  FAMILY_DASHBOARD_PROFILE_PATH,
  AGENT_DASHBOARD_FAMILIES_PATH,
  FAMILY_DASHBOARD_MESSAGES_PATH,
  AGENT_DASHBOARD_MESSAGES_PATH,
  ADMIN_DASHBOARD_CALLS_PATH,
  AGENT_DASHBOARD_TASKS_PATH, AGENT_DASHBOARD_CONTACTS_PATH,
} from 'sly/constants/dashboardAppPaths';
import { CUSTOMER_ROLE, AGENT_ND_ROLE, PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import HeaderContainer from 'sly/containers/HeaderContainer';
import ModalContainer from 'sly/containers/ModalContainer';
import DashboardMenu from 'sly/components/molecules/DashboardMenu';
import SlyEvent from 'sly/services/helpers/events';

const onMenuItemClick = (menuItem) => {
  const { label } = menuItem;
  const event = {
    category: 'DashboardMenuItem',
    action: 'click',
    label,
  };
  SlyEvent.getInstance().sendEvent(event);
};

const menuItems = [
  { label: 'Favorites', icon: 'favourite-light', iconSize: 'regular', palette: 'slate', variation: 'filler', href: FAMILY_DASHBOARD_FAVORITES_PATH, role: CUSTOMER_ROLE, onClick: onMenuItemClick },
  { label: 'My Profile', icon: 'settings', iconSize: 'regular', palette: 'slate', variation: 'filler', href: FAMILY_DASHBOARD_PROFILE_PATH, role: CUSTOMER_ROLE, onClick: onMenuItemClick },
  { label: 'My Families', icon: 'users', iconSize: 'regular', palette: 'slate', variation: 'filler', href: generatePath(AGENT_DASHBOARD_FAMILIES_PATH), role: AGENT_ND_ROLE, onClick: onMenuItemClick },
  { label: 'My Contacts', icon: 'users', iconSize: 'regular', palette: 'slate', variation: 'filler', href: AGENT_DASHBOARD_CONTACTS_PATH, role: PLATFORM_ADMIN_ROLE, onClick: onMenuItemClick },
  // { label: 'Messages_', icon: 'message', iconSize: 'regular', palette: 'slate', variation: 'filler', href: FAMILY_DASHBOARD_MESSAGES_PATH, role: CUSTOMER_ROLE, onClick: onMenuItemClick },
  { label: 'Messages', icon: 'message', iconSize: 'regular', palette: 'slate', variation: 'filler', href: AGENT_DASHBOARD_MESSAGES_PATH, role: PLATFORM_ADMIN_ROLE, onClick: onMenuItemClick },
  { label: 'Tasks', icon: 'checkbox-fill', iconSize: 'regular', palette: 'slate', variation: 'filler', href: generatePath(AGENT_DASHBOARD_TASKS_PATH), role: PLATFORM_ADMIN_ROLE, onClick: onMenuItemClick },
  { label: 'Calls', icon: 'phone', iconSize: 'regular', palette: 'slate', variation: 'filler', href: ADMIN_DASHBOARD_CALLS_PATH, role: PLATFORM_ADMIN_ROLE, onClick: onMenuItemClick },
];

const Header = styled.div`
  background-color: ${palette('white.base')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
  }
`;

const Column = styled.aside`
  background-color: ${palette('white.base')};
  display:none;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
    width: ${size('element.xxHuge')};
    display: inherit;
    grid-column: 1 / 2;
    grid-row: 2 / 2;
  }
`;

const Body = styled.main`
  overflow: ${ifProp('bodyHasOverflow', 'auto', 'initial')};
  height: 100%;
  background-color: ${palette('grey.background')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-column: 2 / 2;
    grid-row: 2 / 2;
  }
`;

// min-width: 0 helps in avaoiding overflow when used with a clampped text children component like LatestMessage
const DashboardPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  > :first-child {
    flex-grow: 0;
  }

  > :nth-child(n+2) {
    flex-grow: 1;
    min-width: 0;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: grid;
    grid-template-columns: ${size('element.xxHuge')} auto;
    grid-gap: 0;
    grid-template-rows: max-content auto;
  }
`;

const DashboardPageTemplate = ({
  children, activeMenuItem, className, bodyHasOverflow,
}) => {
  const mi = menuItems.map((mi) => {
    if (mi.label === activeMenuItem) {
      mi.active = true;
      mi.variation = 'dark35';
    } else {
      mi.active = false;
      mi.variation = 'filler';
    }
    return mi;
  });

  return (
    <DashboardPage className={className}>
      <Header><HeaderContainer /></Header>
      <Column><DashboardMenu menuItems={mi} /></Column>
      <Body bodyHasOverflow={bodyHasOverflow}>{children}</Body>
      <ModalContainer />
    </DashboardPage>
  );
};

DashboardPageTemplate.propTypes = {
  children: node,
  activeMenuItem: string.isRequired,
  className: string,
  bodyHasOverflow: bool,
};

export default DashboardPageTemplate;
