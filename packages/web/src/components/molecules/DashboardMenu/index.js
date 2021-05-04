import React from 'react';
import { string } from 'prop-types';
import { generatePath } from 'react-router';

import { Link } from 'sly/common/components/atoms';
import {
  Family,
  Agents,
  CommunitySizeLarge,
  CheckmarkCircle,
  Contacts,
  Messages,
  CommunitySizeSmall,
  Favorite,
  User,
  Settings,
} from 'sly/common/icons';
import { Span } from 'sly/web/components/atoms';
import {
  ADMIN_DASHBOARD_AGENTS_PATH,
  AGENT_DASHBOARD_CONTACTS_PATH,
  AGENT_DASHBOARD_FAMILIES_PATH, AGENT_DASHBOARD_MESSAGES_PATH,
  AGENT_DASHBOARD_PROFILE_PATH, AGENT_DASHBOARD_TASKS_PATH,
  DASHBOARD_ACCOUNT_PATH, DASHBOARD_COMMUNITIES_PATH,
  FAMILY_DASHBOARD_FAVORITES_PATH,
  FAMILY_DASHBOARD_HOME_PATH,
} from 'sly/web/constants/dashboardAppPaths';
import {
  AGENT_ADMIN_ROLE,
  AGENT_ND_ROLE,
  CUSTOMER_ROLE, PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE,
} from 'sly/common/constants/roles';
import Block from 'sly/web/components/atoms/Block';
import Role from 'sly/web/components/common/Role';

const menuItemFor = (menuItem) => {
  const { label } = menuItem;
  const event = {
    category: 'DashboardMenuItem',
    action: 'click',
    label,
  };
  return {
    iconSize: 'regular',
    palette: 'slate',
    variation: 'filler',
    event,
    ...menuItem,
  };
};

const FavoriteActive = props => <Favorite active {...props} />;
/* eslint-disable no-bitwise */
export const menuItems = [
  { label: 'Families', Icon: Family, href: generatePath(AGENT_DASHBOARD_FAMILIES_PATH), role: AGENT_ND_ROLE | AGENT_ADMIN_ROLE },
  { label: 'Agents', Icon: Agents, href: ADMIN_DASHBOARD_AGENTS_PATH, role: PLATFORM_ADMIN_ROLE },
  { label: 'Communities', Icon: CommunitySizeLarge, href: DASHBOARD_COMMUNITIES_PATH, role: PLATFORM_ADMIN_ROLE | PROVIDER_OD_ROLE },
  { label: 'Tasks', Icon: CheckmarkCircle, href: generatePath(AGENT_DASHBOARD_TASKS_PATH), role: AGENT_ADMIN_ROLE },
  { label: 'Contacts', Icon: Contacts, href: AGENT_DASHBOARD_CONTACTS_PATH, role: AGENT_ADMIN_ROLE },
  { label: 'Messages', Icon: Messages, href: AGENT_DASHBOARD_MESSAGES_PATH, role: PLATFORM_ADMIN_ROLE },
  { label: 'Home Base', Icon: CommunitySizeSmall, href: FAMILY_DASHBOARD_HOME_PATH, role: CUSTOMER_ROLE },
  { label: 'Favorites', Icon: FavoriteActive, href: FAMILY_DASHBOARD_FAVORITES_PATH, role: CUSTOMER_ROLE },
  { label: 'Profile', Icon: User, href: AGENT_DASHBOARD_PROFILE_PATH, role: AGENT_ND_ROLE | AGENT_ADMIN_ROLE },
  { label: 'Account', Icon: Settings, href: DASHBOARD_ACCOUNT_PATH, role: CUSTOMER_ROLE | PROVIDER_OD_ROLE | AGENT_ND_ROLE },
].map(menuItemFor);
/* eslint-enable no-bitwise */

const DashboardMenu = ({ activeMenuItem }) => {
  const menuItemComponents = menuItems.map(({ Icon, ...item }) => {
    const selected = item.label === activeMenuItem;
    const palette = selected
      ? 'primary'
      : 'grey';
    const weight = selected
      ? 'medium'
      : undefined;

    return (
      <Role is={item.role} key={item.label}>
        <Link
          size="caption"
          to={item.href}
          key={item.label}
          palette={palette}
          block
          marginBottom="xLarge"
        >
          <Icon size="s" marginRight="s" />
          <Span weight={weight}>{item.label}</Span>
        </Link>
      </Role>
    );
  });
  return (
    <Block padding="xLarge">
      {menuItemComponents}
    </Block>
  );
};

DashboardMenu.propTypes = {
  activeMenuItem: string.isRequired,
};

export default DashboardMenu;
