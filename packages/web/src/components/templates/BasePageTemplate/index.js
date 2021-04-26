import React  from 'react';
import styled from 'styled-components';
import { node, string } from 'prop-types';


import ModalContainer from 'sly/web/containers/ModalContainer';
import { space, sx$laptop, sx$tablet } from 'sly/common/system';

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${space('m')};
  ${sx$tablet({
    padding: '0',
    width: 'col8',
  })}

  ${sx$laptop({
    width: 'col12',
  })}
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
  margin-bottom: ${p => p.noBottomMargin ? 0 : space('l')};
`;
