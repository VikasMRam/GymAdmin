import React from 'react';
import styled from 'styled-components';
import { bool, func, object } from 'prop-types';

import { size } from 'sly/common/components/themes';
import Modal, { HeaderWithClose } from 'sly/web/components/atoms/NewModal';
import { Block } from 'sly/common/components/atoms';
import { Button, Icon } from 'sly/web/components/atoms';

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.regular')};
`;

const EntryModal = ({ isOpen, onClose, content }) => {
  const { heading, caption, description } = content;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <HeaderWithClose onClose={onClose} ><Icon palette="primary" size="body" icon="tick" /> {heading}</HeaderWithClose>
      <Block padding="large" startingWithTablet={{ padding: size('spacing.xLarge') }}>
        <Block size="body" weight="medium" marginBottom="regular" >{caption}</Block>
        <Block marginBottom="xLarge">{description}</Block>
        <StyledButton onClick={onClose}>Go to my Home Base</StyledButton>
      </Block>
    </Modal>
  );
};

EntryModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  content: object.isRequired,

};

export default EntryModal;
