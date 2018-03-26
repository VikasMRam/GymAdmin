import React from 'react';
import { node, string, bool, func } from 'prop-types';
import styled, { css, injectGlobal } from 'styled-components';
import ReactModal from 'react-modal';
import { font, palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import { Heading } from 'sly/components/atoms';
import IconButton from 'sly/components/molecules/IconButton';

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
  font-size: 1rem;
  background-color: ${palette('white', 2)};
  border-radius: 0.125em;
  color: ${palette('grayscale', 0)};
  transition: transform 250ms ease-in-out;
  outline: none;
  box-sizing: border-box;
  padding-top: ${({ hasHeader }) => (hasHeader ? 0 : '1rem')};
  width: 100%;
  height: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: unset;
    height: unset;
    top: calc(50% - 1rem);
    left: calc(50% - 1rem);
    right: auto;
    bottom: auto;
    margin: 1rem calc(-50% + 1rem) 1rem 1rem;
    transform: translate(-50%, 100%);
    min-width: 320px;
    max-width: calc(640px - 1rem);
    max-height: calc(100% - 1rem);
    &[class*='after-open'] {
      transform: translate(-50%, -50%);
    }
    &[class*='before-close'] {
      transform: translate(-50%, 100%);
    }
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  > *:last-child {
    flex: 1;
  }
`;

const StyledHeading = styled(Heading)`
  margin: 0 1rem 0 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Content = styled.div`
  overflow: auto;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;

const StyledReactModal = styled(({ className, ...props }) => (
  <ModalBox overlayClassName={className} closeTimeoutMS={250} {...props} />
))`
  ${overlayStyles};
`;

const Modal = ({
  children, title, closeable, onClose, ...props
}) => {
  const hasHeader = title || closeable;
  return (
    <StyledReactModal
      contentLabel={title || 'Modal'}
      onRequestClose={onClose}
      hasHeader={hasHeader}
      {...props}
    >
      {hasHeader && (
        <Header>
          {closeable && (
            <IconButton
              icon="close"
              iconOnly
              onClick={onClose}
              palette="grayscale"
              reverse
            />
          )}
          <StyledHeading level={2} reverse={props.reverse}>
            {title}
          </StyledHeading>
        </Header>
      )}
      <Content>{children}</Content>
    </StyledReactModal>
  );
};

Modal.propTypes = {
  children: node,
  title: string,
  closeable: bool,
  reverse: bool,
  onClose: func.isRequired,
};

export default Modal;
