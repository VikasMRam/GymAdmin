import React, { Component, createContext, useContext, forwardRef, createRef } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { ifProp, prop } from 'styled-tools';
import { any, func, bool, element, string } from 'prop-types';
import ScrollLock from 'react-scrolllock';
import Helmet from 'react-helmet';


import { size, palette, key } from 'sly/common/components/themes';
import { withSpacing } from 'sly/common/components/helpers';
import { Heading } from 'sly/common/system';
import IconButton from 'sly/common/components/molecules/IconButton';
import Block from 'sly/common/components/atoms/Block';
import Icon from 'sly/common/components/atoms/Icon';

const ActiveModalContext = createContext(false);

const Overlay = styled.div`
  display: ${ifProp('isOpen', 'flex', 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${ifProp('transparent', 'transparent', css`${palette('slate', 'base')}e5`)};
  overflow: auto;
  z-index: calc(${key('zIndexes.modal.overlay')} - ${prop('instanceNumber')});
`;

const Modal = styled.div`
  background-color: ${palette('white', 'base')};
  display: ${ifProp('isOpen', 'flex', 'none')};
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
  height:100%;
  

  @media screen and (min-width: 552px) {
    ${withSpacing};
    max-height: calc(100vh - 48px);
    height:auto;
    margin-top: 1rem;
    margin-top: unset;
    border-radius: 6px;
    max-width: ${size('layout.col6')};
  }
`;

export const PaddedHeaderWithCloseBody = styled.div`
  padding: ${size('spacing.xxLarge')};
  padding-top: 0;
`;

export const HeaderWithClose = forwardRef(({ children, icon, onClose, noBorder,  ...props }, ref) => (
  <Block
    ref={ref}
    display="flex"
    alignItems="center"
    flexShrink="0"
    padding="0 xLarge"
    height="76px"
    borderBottom={noBorder ? 'none' : 'regular'}
    {...props}
  >
    {icon && (
      <Icon
        icon={icon}
        size="caption"
        padding="6px"
        palette="primary"
        background="primary.lighter-90"
        marginRight="medium"
        borderRadius="large"
      />
    )}

    <Heading
      font="title-m"
      flexGrow="1"
      marginRight="l"
      clamped="true"
    >
      {children}
    </Heading>

    <IconButton
      icon="close"
      palette="slate"
      iconSize="body"
      onClick={onClose}
      padding="0"
      flexGrow="0"
      transparent
    />
  </Block>
));

HeaderWithClose.propTypes = {
  children: element,
  icon: string,
  onClose: func,
  noBorder: bool,
};

export const ModalBody = forwardRef((props, ref) => {
  const isActive = useContext(ActiveModalContext);
  return (
    <ScrollLock isActive={isActive}>
      <Block
        ref={ref}
        {...props}
        css={{
          overflowY: 'auto',
        }}
      />
    </ScrollLock>
  );
});


ModalBody.defaultProps = {
  padding: 'xLarge',
};

export const ModalActions = forwardRef((props, ref) => (
  <Block
    ref={ref}
    display="flex"
    flexShrink="0"
    padding="large xLarge"
    borderTop="regular"
    {...props}
  />
));

ModalActions.displayName = 'ModalActions';

const PORTAL_ELEMENT_CLASS = 'modal-portal';

// TODO: @fonz todo a proper modal from this hack; animate entry and leave;
export default class NewModal extends Component {
  static typeHydrationId = 'NewModal';
  static el = null;
  static instanceNumber = 0;

  overlayRef = createRef();
  modalRef = createRef();
  state = { mounted: false };

  componentDidMount() {
    NewModal.instanceNumber++;
    if (!NewModal.el) {
      NewModal.el = document.createElement('div');
      NewModal.el.setAttribute('class', PORTAL_ELEMENT_CLASS);
      document.body.appendChild(NewModal.el);
    }
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    this;

    NewModal.instanceNumber--;

    if (NewModal.instanceNumber === 0) {
      document.body.removeChild(NewModal.el);
      NewModal.el = null;
    }
  }

  onClick = (e) => {
    const { onClose } = this.props;

    if (e.target === this.overlayRef.current) {
      onClose(e);
    }
    return null;
  };

  render() {
    const { children, isOpen, transparent, ...props } = this.props;

    return this.state.mounted && createPortal(
      <Overlay
        ref={this.overlayRef}
        transparent={transparent}
        onClick={this.onClick}
        isOpen={isOpen}
        instanceNumber={NewModal.instanceNumber}
      >
        <Modal
          ref={this.modalRef}
          isOpen={isOpen}
          {...props}
        >
          <ActiveModalContext.Provider value={isOpen}>
            {children}
            <Helmet>
              <style>
                {`
                  body{
                    overflow: hidden
                  }
                `}
              </style>
            </Helmet>
          </ActiveModalContext.Provider>
        </Modal>
      </Overlay>,
      NewModal.el,
    );
  }
}

NewModal.propTypes = {
  children: any,
  onClose: func,
  isOpen: bool,
  transparent: bool,
};

NewModal.defaultProps = {
  isOpen: true,
};
