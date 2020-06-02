import React from 'react';
import { shape, arrayOf, string, number } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/web/components/themes';
import Role from 'sly/web/components/common/Role';
import { Icon, Span, Link } from 'sly/web/components/atoms';
import pad from 'sly/web/components/helpers/pad';
import {
  ADMIN_DASHBOARD_AGENTS_PATH,
  ADMIN_DASHBOARD_CALLS_PATH,
  AGENT_DASHBOARD_CONTACTS_PATH,
  AGENT_DASHBOARD_FAMILIES_PATH, AGENT_DASHBOARD_MESSAGES_PATH,
  AGENT_DASHBOARD_PROFILE_PATH, AGENT_DASHBOARD_TASKS_PATH,
  DASHBOARD_ACCOUNT_PATH, DASHBOARD_COMMUNITIES_PATH,
  FAMILY_DASHBOARD_FAVORITES_PATH,
} from 'sly/web/constants/dashboardAppPaths';
import {
  AGENT_ADMIN_ROLE,
  AGENT_ND_ROLE,
  CUSTOMER_ROLE, PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE,
} from 'sly/web/constants/roles';
import { generatePath } from 'react-router';

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

/* eslint-disable no-bitwise */
const menuItems = [
  { label: 'Favorites', icon: 'favourite-light', href: FAMILY_DASHBOARD_FAVORITES_PATH, role: CUSTOMER_ROLE },
  { label: 'My Families', icon: 'users', href: generatePath(AGENT_DASHBOARD_FAMILIES_PATH), role: AGENT_ND_ROLE | AGENT_ADMIN_ROLE },
  { label: 'My Account', icon: 'user', href: DASHBOARD_ACCOUNT_PATH, role: CUSTOMER_ROLE | PROVIDER_OD_ROLE | AGENT_ND_ROLE },
  { label: 'My Profile', icon: 'settings', href: AGENT_DASHBOARD_PROFILE_PATH, role: AGENT_ND_ROLE | AGENT_ADMIN_ROLE },
  { label: 'My Contacts', icon: 'users', href: AGENT_DASHBOARD_CONTACTS_PATH, role: AGENT_ADMIN_ROLE },
  // { label: 'Messages_', icon: 'message', href: FAMILY_DASHBOARD_MESSAGES_PATH, role: CUSTOMER_ROLE },
  { label: 'Communities', icon: 'house', href: DASHBOARD_COMMUNITIES_PATH, role: PLATFORM_ADMIN_ROLE | PROVIDER_OD_ROLE },
  { label: 'Messages', icon: 'message', href: AGENT_DASHBOARD_MESSAGES_PATH, role: PLATFORM_ADMIN_ROLE },
  { label: 'Tasks', icon: 'checkbox-fill', href: generatePath(AGENT_DASHBOARD_TASKS_PATH), role: AGENT_ADMIN_ROLE },
  { label: 'Calls', icon: 'phone', href: ADMIN_DASHBOARD_CALLS_PATH, role: PLATFORM_ADMIN_ROLE },
  { label: 'Agents', icon: 'user', href: ADMIN_DASHBOARD_AGENTS_PATH, role: PLATFORM_ADMIN_ROLE },
].map(menuItemFor);
/* eslint-enable no-bitwise */

const Wrapper = styled.div`
`;

const MenuItem = styled(Link)`
  display: block;
  margin: ${
  > ${Icon} {
    margin-right: 12px;
  }
`;

const DashboardMenu = ({ activeMenuItem }) => {
  const menuItemComponents = menuItems.map((item) => {
    const selected = item.label === activeMenuItem;
    const palette = selected
      ? 'viridian'
      : 'grey';
    return (
      // <Role is={item.role} key={item.label}>
        <MenuItem to={item.href} key={item.label} palette={palette}>
          <Icon icon={item.icon} size="caption" />
          <Span weight="medium" size="caption">{item.label}</Span>
        </MenuItem>
      // </Role>
    );
  });
  return (
    <Wrapper>
      {menuItemComponents}
    </Wrapper>
  );
};

DashboardMenu.propTypes = {
  activeMenuItem: string.isRequired,
};

export default DashboardMenu;
