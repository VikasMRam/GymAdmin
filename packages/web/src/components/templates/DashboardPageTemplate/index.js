import React from 'react';
import { node, string } from 'prop-types';
import styled, { css } from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import { startingWith } from 'sly/common/components/helpers';
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

  ${startingWith('laptop', `
    width: 180px;
    display: inherit;
  `)}
`;

const Body = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${palette('grey.background')};
  grid-area: body;

  ${startingWith('tablet', css`
    padding: ${size('spacing.xLarge')};
  `)}

  ${startingWith('desktop', 'height: 100%;')}
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

  ${startingWith('laptop', css`
    display: grid;
    grid-template-columns: 180px auto;
    grid-gap: 0;
    grid-template-rows: max-content auto;
    grid-template-areas:
      "header header"
      "sidebar body";
  `)}
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
