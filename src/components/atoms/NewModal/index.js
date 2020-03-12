import React from 'react';
import styled from 'styled-components';
import { any, func } from 'prop-types';

import { size } from 'sly/components/themes';
import textAlign from 'sly/components/helpers/textAlign';
import IconButton from 'sly/components/molecules/IconButton';

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #2A333Fe5;
  overflow: auto;
  z-index: 15000;
`;

const Modal = styled.div`
  margin: auto;
  border-radius: 6px;
  background-color: #fff;

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

// TODO: @fonz todo a proper modal from this hack; animate entry and leave;
// FIXME: we had to uqickly introduce this because the modals were impeding agents
// to update the Stages
// FIXME: more than one modal are currently possible, we have to mimic the mechanism used in react-modal

export default function NewModal({ children, onClose, ...props }) {
  const overlayRef = React.createRef();
  const onClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose(e);
    }
    return null;
  };

  return (
    <Overlay ref={overlayRef} onClick={onClick}>
      <Modal {...props}>
        {children}
      </Modal>
    </Overlay>
  );
}

NewModal.propTypes = {
  children: any,
  onClose: func,
};
