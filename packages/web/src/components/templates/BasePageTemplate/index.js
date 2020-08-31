import React  from 'react';
import styled from 'styled-components';
import { node, string } from 'prop-types';

import { size } from 'sly/common/components/themes';
import ModalContainer from 'sly/web/containers/ModalContainer';

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

export const TemplateContent = ({ children, className }) => (
  <>
    <Main className={className}>{children}</Main>
    <ModalContainer />
  </>
);

TemplateContent.propTypes = {
  children: node,
  className: string,
};

export const TemplateHeader = styled.header`
  margin-bottom: ${p => p.noBottomMargin ? 0 : size('spacing.xLarge')};
`;
