import React from 'react';
import { node, string } from 'prop-types';
import styled from 'styled-components';
import classes from 'classnames';

import { size, palette, columnWidth } from 'sly/components/themes';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';

const Wrapper = styled.div`
  display: flex;

  > * {
    background-color: ${palette('white.base')};
  }

  > *:nth-child(1) {
    margin-right: ${size('layout.gutter')};
    width: ${columnWidth(3, size('layout.gutter'))};
  }

  > *:nth-child(2) {
    flex-grow: 1;
  }
`;

const DashboardTwoColumnTemplate = ({ children, activeMenuItem }) => (
  <DashboardPageTemplate activeMenuItem={activeMenuItem}>
    <Wrapper>
      {children}
    </Wrapper>
  </DashboardPageTemplate>
);

DashboardTwoColumnTemplate.propTypes = {
  children: node,
  activeMenuItem: string,
};

export default DashboardTwoColumnTemplate;
