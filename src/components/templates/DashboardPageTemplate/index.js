import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import HeaderContainer from 'sly/containers/HeaderContainer';
import DashboardMenu from 'sly/components/molecules/DashboardMenu';

const menuItems = [
  {
    label: 'Favorites', icon: 'favourite-light', iconSize: 'regular', palette: 'slate', variation: 'base', active: true,
  },
  {
    label: 'Profile', icon: 'user', iconSize: 'regular', palette: 'slate', variation: 'filler',
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
  padding: ${size('spacing.xLarge')};
  background-color: ${palette('grey.background')};

  > * {
    background-color: ${palette('white.base')};
  }

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

const DashboardPageTemplate = ({ children }) => (
  <DashboardPage>
    <Header><HeaderContainer /></Header>
    <Column><DashboardMenu menuItems={menuItems} /></Column>
    <Body>{children}</Body>
  </DashboardPage>
);

DashboardPageTemplate.propTypes = {
  children: node,
};

export default DashboardPageTemplate;
