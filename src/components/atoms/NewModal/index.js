import React, { Component } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import { ifProp, prop } from 'styled-tools';
import { any, func, bool } from 'prop-types';

import { isBrowser } from 'sly/config';
import { size, palette, key } from 'sly/components/themes';
import textAlign from 'sly/components/helpers/textAlign';
import IconButton from 'sly/components/molecules/IconButton';

const Overlay = styled.div`
  display: ${ifProp('isOpen', 'flex', 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${palette('slate', 'base')}e5;
  overflow: auto;
  z-index: calc(${key('zIndexes.modal.overlay')} + ${prop('instanceNumber')});
`;

const Modal = styled.div`
  margin: auto;
  border-radius: 6px;
  background-color: ${palette('white', 'base')};
  display: ${ifProp('isOpen', 'block', 'none')};

  width: calc(100% - ${size('spacing.xxLarge')});
  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    width: ${size('layout.col4')};
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col6')};
  }
`;

const Head = textAlign(styled.div`
  padding: ${size('spacing.large')};
  padding-bottom: ${size('spacing.regular')};
`, 'right');

export const PaddedHeaderWithCloseBody = styled.div`
  padding: ${size('spacing.xxLarge')};
  padding-top: 0;
`;

export const HeaderWithClose = ({ onClose }) => (
  <Head>
    <IconButton
      icon="close"
      iconSize="regular"
      palette="slate"
      onClick={onClose}
      transparent
    />
  </Head>
);

HeaderWithClose.propTypes = {
  onClose: func,
};

const PORTAL_ELEMENT_CLASS = 'modal-portal';
let instanceNumber = 0;

// TODO: @fonz todo a proper modal from this hack; animate entry and leave;
// FIXME: we had to uqickly introduce this because the modals were impeding agents
// to update the Stages
// FIXME: more than one modal are currently possible, we have to mimic the mechanism used in react-modal
export default class NewModal extends Component {
  overlayRef = React.createRef();

  constructor(props) {
    super(props);

    if (isBrowser) {
      this.insertEl();
    }
  }

  componentDidMount() {
    instanceNumber++;
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
    const { children, isOpen, ...props } = this.props;

    if (!isBrowser) {
      return null;
    }

    return ReactDom.createPortal(
      (
        <Overlay ref={this.overlayRef} onClick={this.onClick} isOpen={isOpen} instanceNumber={instanceNumber}>
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
};

NewModal.defaultProps = {
  isOpen: true,
};
