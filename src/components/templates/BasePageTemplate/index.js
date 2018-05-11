import React, { Fragment } from 'react';
import { any } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';

const Content = styled.main`
  width: 100%;
  margin: 0 auto;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: calc(
      ${size('layout.mainColumn')} + ${size('layout.sideColumn')} +
        ${size('spacing.xLarge')}
    );
  }
  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: ${size('layout.laptopLarge')};
  }
`;

const BasePageTemplate = ({
  header, children, footer,
}) => (
  <Fragment>
    {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
    <header>{header}</header>
    <Content>{children}</Content>
    <footer>{footer}</footer>
  </Fragment>
);

BasePageTemplate.propTypes = {
  header: any.isRequired,
  footer: any.isRequired,
  children: any.isRequired,
};

export default BasePageTemplate;
