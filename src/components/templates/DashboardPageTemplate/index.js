import React from 'react';
import { node, string } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { FAMILY_DASHBOARD_FAVORITES_PATH, FAMILY_DASHBOARD_PROFILE_PATH } from 'sly/constants/dashboardAppPaths';
import HeaderContainer from 'sly/containers/HeaderContainer';
import ModalContainer from 'sly/containers/ModalContainer';
import DashboardMenu from 'sly/components/molecules/DashboardMenu';

const menuItems = [
  {
    label: 'Favorites', icon: 'favourite-light', iconSize: 'regular', palette: 'slate', variation: 'base', href: FAMILY_DASHBOARD_FAVORITES_PATH,
  },
  {
    label: 'Profile', icon: 'user', iconSize: 'regular', palette: 'slate', variation: 'filler', href: FAMILY_DASHBOARD_PROFILE_PATH,
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
  padding: ${size('spacing.large')} ${size('spacing.xLarge')};
  background-color: ${palette('grey.background')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
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
  const mi = menuItems.find(i => i.label === activeMenuItem);
  if (mi) {
    mi.active = true;
  }

  return (
    <DashboardPage>
      <Header><HeaderContainer /></Header>
      <Column><DashboardMenu menuItems={menuItems} /></Column>
      <Body>{children}</Body>
      <ModalContainer />
    </DashboardPage>
  );
};

DashboardPageTemplate.propTypes = {
  children: node,
  activeMenuItem: string,
};

export default DashboardPageTemplate;
