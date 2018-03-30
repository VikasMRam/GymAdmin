import React from 'react';
import { node, string, bool, func, oneOf } from 'prop-types';
import styled, { css, injectGlobal } from 'styled-components';
import ReactModal from 'react-modal';
import { font, palette } from 'styled-theme';
import { ifProp, withProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Heading } from 'sly/components/atoms';
import IconButton from 'sly/components/molecules/IconButton';

const doubleModalWidth = withProp('layout', layout => {
  console.log(layout);  
  return size('modal', layout);
}); 

injectGlobal`
  body.ReactModal__Body--open {
    overflow: hidden;
  }
`;

const overlayStyles = css`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9999;
  transition: opacity 250ms ease-in-out;
  opacity: 0;
  &[class*='after-open'] {
    opacity: 1;
  }
  &[class*='before-close'] {
    opacity: 0;
  }
`;

const ModalBox = styled(ReactModal)`
  position: absolute;
  display: flex;
  flex-direction: column;
  font-family: ${font('primary')};
  background-color: ${palette('white', 2)};
  border-radius: ${size('spacing.tiny')};
  color: ${palette('grayscale', 0)};
  transition: transform 250ms ease-in-out;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: ${size('spacing.xxxLarge')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: unset;
    top: calc(50% - 1rem);
    left: calc(50% - 1rem);
    right: auto;
    bottom: auto;
    margin: 1rem calc(-50% + 1rem) 1rem 1rem;
    transform: translate(-50%, 100%);
    width: ${size('modal.single')};
    max-height: calc(100% - 1rem);
    &[class*='after-open'] {
      transform: translate(-50%, -50%);
    }
    &[class*='before-close'] {
      transform: translate(-50%, 100%);
    }
  }
  @media screen and (min-width: ${size('breakpoint.doubleModal')}) {
    width: ${doubleModalWidth};
  }
`;

const StyledReactModal = styled(({ className, ...props }) => (
  <ModalBox overlayClassName={className} closeTimeoutMS={250} {...props} />
))`
  ${overlayStyles};
`;

const Content = styled.div`
  overflow: auto;
  @media screen and (min-width: ${size('breakpoint.doubleModal')}) {
    margin-left: ${ifProp({ layout: 'double' }, size('modal.single'), 0)};
  }
`;

const Modal = ({
  children, closeable, layout, onClose, ...props
}) => {
  const iconClose = (
    <IconButton
      className="closeButton"
      icon="close"
      iconOnly
      onClick={onClose}
      palette="grayscale"
      reverse
    />
  );
  return (
    <StyledReactModal
      onRequestClose={onClose}
      layout={layout}
      {...props}
    >
      {closeable && iconClose}
      <Content layout={layout}>
        {children}
      </Content>
    </StyledReactModal>
  );
};

Modal.propTypes = {
  layout: oneOf(['single', 'double']).isRequired,
  children: node,
  title: string,
  closeable: bool,
  reverse: bool,
  onClose: func.isRequired,
};

Modal.defaultProps = {
  layout: 'single',
};

export default Modal;
