import React from 'react';
import { node, string } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { FAMILY_DASHBOARD_FAVORITES_PATH, FAMILY_DASHBOARD_PROFILE_PATH, FAMILY_DASHBOARD_FAMILIES_PATH } from 'sly/constants/dashboardAppPaths';
import { CUSTOMER_ROLE, AGENT_ROLE } from 'sly/constants/roles';
import HeaderContainer from 'sly/containers/HeaderContainer';
import ModalContainer from 'sly/containers/ModalContainer';
import DashboardMenu from 'sly/components/molecules/DashboardMenu';

const menuItems = [
  {
    label: 'Favorites', icon: 'favourite-light', iconSize: 'regular', palette: 'slate', variation: 'filler', href: FAMILY_DASHBOARD_FAVORITES_PATH, role: CUSTOMER_ROLE,
  },
  {
    label: 'My Profile', icon: 'user', iconSize: 'regular', palette: 'slate', variation: 'filler', href: FAMILY_DASHBOARD_PROFILE_PATH, role: CUSTOMER_ROLE,
  },
  {
    label: 'My Families', icon: 'users', iconSize: 'regular', palette: 'slate', variation: 'filler', href: FAMILY_DASHBOARD_FAMILIES_PATH, role: AGENT_ROLE,
  },
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

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('element.xxHuge')};
    display: inherit;
    grid-column: 1 / 2;
    grid-row: 2 / 2;
  }
`;

const Body = styled.main`
  background-color: ${palette('grey.background')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding: ${size('spacing.xLarge')};
    grid-column: 2 / 2;
    grid-row: 2 / 2;
  }
`;

const DashboardPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: grid;
    grid-template-columns: ${size('element.xxHuge')} auto;
    grid-gap: 0;
    grid-template-rows: max-content auto;
  }
`;

const DashboardPageTemplate = ({ children, activeMenuItem }) => {
  const mi = menuItems.map((mi) => {
    if (mi.label === activeMenuItem) {
      mi.active = true;
      mi.variation = 'base';
    } else {
      mi.active = false;
      mi.variation = 'filler';
    }
    return mi;
  });

  return (
    <DashboardPage>
      <Header><HeaderContainer /></Header>
      <Column><DashboardMenu menuItems={mi} /></Column>
      <Body>{children}</Body>
      <ModalContainer />
    </DashboardPage>
  );
};

DashboardPageTemplate.propTypes = {
  children: node,
  activeMenuItem: string.isRequired,
};

export default DashboardPageTemplate;
