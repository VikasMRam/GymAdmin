import React, { Fragment } from 'react';
import styled from 'styled-components';
import { bool, node } from 'prop-types';

import { size } from 'sly/components/themes';
import ChatBoxContainer from 'sly/containers/ChatBoxContainer';

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${size('spacing.large')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0;
    width: ${size('layout.col8')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col12')};
  }
`;

export const TemplateContent = ({ hasStickyFooter, children }) => (
  <Fragment>
    <Main>{children}</Main>
    <ChatBoxContainer pageWithStickyFooter={hasStickyFooter} />
  </Fragment>
);
TemplateContent.propTypes = {
  hasStickyFooter: bool,
  children: node,
};

export const TemplateHeader = styled.header`
  margin-bottom: ${size('spacing.large')};
`;
