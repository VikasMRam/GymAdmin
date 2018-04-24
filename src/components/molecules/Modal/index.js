import React from 'react';
import { node, string, bool, func, oneOf } from 'prop-types';
import styled, { css, injectGlobal } from 'styled-components';
import ReactModal from 'react-modal';
import { font, palette } from 'styled-theme';
import { ifProp, withProp, switchProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import IconButton from 'sly/components/molecules/IconButton';

const doubleModalWidth = withProp('layout', layout => size('modal', layout));

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
  background-color: ${palette('white', 0)};
  border-radius: ${size('spacing.tiny')};
  color: ${palette('slate', 0)};
  transition: transform 250ms ease-in-out;
  outline: none;
  padding: ${size('spacing.xxxLarge')};
  width: 100%;
  height: 100%;
  overflow: auto;
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
  ${switchProp('layout', { 
    double: css`@media screen and (min-width: ${size('breakpoint.doubleModal')}) {
      padding: 0;
      flex-direction: row;
      width: ${doubleModalWidth};
      overflow: unset;
    }`
  })}
`;

const StyledReactModal = styled(({ className, ...props }) => (
  <ModalBox overlayClassName={className} closeTimeoutMS={250} {...props} />
))`
  ${overlayStyles};
`;

const CloseButton = styled(IconButton)`
  ${switchProp('layout', { 
    double: css`@media screen and (min-width: ${size('breakpoint.doubleModal')}) {
      margin-bottom: ${size('spacing.xLarge')};
    }`
  })}
`;

const Heading = styled.div`
  width: 100%;
  padding-bottom: ${size('spacing.xLarge')};
  ${switchProp('layout', { 
    double: css`@media screen and (min-width: ${size('breakpoint.doubleModal')}) {
      padding: ${size('spacing.xxxLarge')};
      width: ${size('modal.single')};
    }`
  })}
`;

const Content = styled.div`
  ${switchProp('layout', { 
    double: css`@media screen and (min-width: ${size('breakpoint.doubleModal')}) {
      padding: ${size('spacing.xxxLarge')};
      width: ${size('modal.single')};
      overflow: auto;
    }`
  })} 
`;

const Modal = ({
  heading, children, closeable, layout, onClose, ...props
}) => {
  const iconClose = (
    <CloseButton
      icon="close"
      iconOnly
      layout={layout}
      onClick={onClose}
      palette="slate"
    />
  );
  return (
    <StyledReactModal
      onRequestClose={onClose}
      layout={layout}
      {...props}
    >
      {(closeable || heading) && (
        <Heading layout={layout}>
          {closeable && iconClose}
          {heading}
        </Heading>
      )}
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
  onClose: func.isRequired,
};

Modal.defaultProps = {
  layout: 'single',
};

export default Modal;
