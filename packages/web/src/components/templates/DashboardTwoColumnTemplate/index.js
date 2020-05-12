import React from 'react';
import { node, string } from 'prop-types';
import styled from 'styled-components';

import { size, columnWidth } from 'sly/web/components/themes';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';

const Wrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;

    > *:nth-child(1) {
      margin-right: ${size('layout.gutter')};
      flex: 0 0 ${columnWidth(3, size('layout.gutter'))};
    }

    > *:nth-child(2) {
      flex-grow: 1;
      overflow: auto;
    }
  }
`;

const DashboardTwoColumnTemplate = ({ top, children, className, activeMenuItem }) => (
  <DashboardPageTemplate className={className} activeMenuItem={activeMenuItem}>
    {top}
    <Wrapper>
      {children}
    </Wrapper>
  </DashboardPageTemplate>
);

DashboardTwoColumnTemplate.propTypes = {
  top: node,
  children: node,
  activeMenuItem: string,
  className: string,
};

export default DashboardTwoColumnTemplate;
