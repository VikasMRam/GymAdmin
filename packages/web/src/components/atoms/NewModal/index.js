import React, { Component, forwardRef } from 'react';
import ReactDom from 'react-dom';
import styled, { css } from 'styled-components';
import { ifProp, prop } from 'styled-tools';
import { any, func, bool, element, string } from 'prop-types';

import { isBrowser } from 'sly/web/config';
import { size, palette, key } from 'sly/common/components/themes';
import { withShadow, withSpacing } from 'sly/common/components/helpers';
import IconButton from 'sly/common/components/molecules/IconButton';
import Block from 'sly/common/components/atoms/Block';
import Icon from 'sly/common/components/atoms/Icon';

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
  ${withSpacing};

  border-radius: 6px;
  background-color: ${palette('white', 'base')};
  display: ${ifProp('isOpen', 'flex', 'none')};
  flex-direction: column;

  width: 100%;
  max-height: calc(100vh - 1rem);
  margin-top: 1rem;

  @media screen and (min-width: 552px) {
    max-height: calc(100vh - 48px);
    margin-top: unset;
    max-width: ${size('layout.col6')};
  }
`;

export const PaddedHeaderWithCloseBody = styled.div`
  padding: ${size('spacing.xxLarge')};
  padding-top: 0;
`;

export const HeaderWithClose = forwardRef(({ children, icon, onClose, ...props }, ref) => (
  <Block
    ref={ref}
    display="flex"
    alignItems="center"
    flexShrink="0"
    padding="0 xLarge"
    height="76px"
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

    <Block
      as="h3"
      size="subtitle"
      fontWeight="medium"
      flexGrow="1"
      marginRight="xLarge"
      clamped
    >
      {children}
    </Block>

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
};

export const ModalBody = styled(Block)`
  overflow-y: auto;
`;

ModalBody.defaultProps = {
  padding: 'xLarge',
};

export const ModalActions = styled(Block)`
  > * {
    margin-left: ${size('spacing.large')};
  }
`;

ModalActions.defaultProps = {
  padding: [0, 'xLarge', 'xLarge'],
  align: 'right',
};

const PORTAL_ELEMENT_CLASS = 'modal-portal';
let instanceNumber = 0;

// TODO: @fonz todo a proper modal from this hack; animate entry and leave;
export default class NewModal extends Component {
  static typeHydrationId = 'NewModal';
  overlayRef = React.createRef();

  constructor(props) {
    super(props);

    if (isBrowser) {
      this.insertEl();
    }
  }

  state = {
    mounted: false,
    instanceNumber: 0,
  };

  componentDidMount() {
    instanceNumber++;

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      mounted: true,
      instanceNumber,
    });
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
    this.el = null;
    instanceNumber--;
  }

  insertEl = () => {
    if (!this.el) {
      this.el = document.createElement('div');
      this.el.setAttribute('class', PORTAL_ELEMENT_CLASS);
      document.body.appendChild(this.el);
    }
  };

  onClick = (e) => {
    const { onClose } = this.props;

    if (e.target === this.overlayRef.current) {
      onClose(e);
    }
    return null;
  };

  render() {
    const { children, isOpen, transparent, ...props } = this.props;
    const { mounted, instanceNumber } = this.state;

    return mounted && ReactDom.createPortal(
      (
        <Overlay ref={this.overlayRef} transparent={transparent} onClick={this.onClick} isOpen={isOpen} instanceNumber={instanceNumber}>
          <Modal isOpen={isOpen} {...props}>
            {children}
          </Modal>
        </Overlay>
      ),
      this.el,
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
