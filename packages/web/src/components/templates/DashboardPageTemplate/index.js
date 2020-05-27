import React from 'react';
import { node, string, bool } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/web/components/themes';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import ModalContainer from 'sly/web/containers/ModalContainer';
import DashboardMenu from 'sly/web/components/molecules/DashboardMenu';

const Header = styled.div`
  background-color: ${palette('white.base')};
  grid-area: header;
`;

const Sidebar = styled.aside`
  background-color: ${palette('white.base')};
  display:none;
  grid-area: sidebar;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: 180px;
    display: inherit;
  }
`;

const Body = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${palette('grey.background')};
  grid-area: body;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xLarge')};
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
    grid-template-columns: 180px auto;
    grid-gap: 0;
    grid-template-rows: max-content auto;
    grid-template-areas:
      "header header"
      "sidebar body";
  }
`;

const DashboardPageTemplate = ({
  children, activeMenuItem, className,
}) => {
  return (
    <DashboardPage>
      <Header><HeaderContainer /></Header>
      <Sidebar><DashboardMenu activeMenuItem={activeMenuItem} /></Sidebar>
      <Body className={className}>{children}</Body>
      <ModalContainer />
    </DashboardPage>
  );
};

DashboardPageTemplate.propTypes = {
  children: node,
  activeMenuItem: string.isRequired,
  className: string,
};

export default DashboardPageTemplate;
