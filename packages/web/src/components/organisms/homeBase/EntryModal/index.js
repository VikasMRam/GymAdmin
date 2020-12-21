import React from 'react';
import styled from 'styled-components';
import { bool, func, object } from 'prop-types';

import { palette, size } from 'sly/common/components/themes';
import Modal, { HeaderWithClose } from 'sly/web/components/atoms/NewModal';
import { Button, Heading } from 'sly/web/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import pad from 'sly/web/components/helpers/pad';

const PaddedHeading = pad(Heading);

const Content = styled.div`
  padding: ${size('spacing.xxLarge')};
  padding-top: 0;
  ${Heading} {
    text-align: center;
  }
`;

const IconItems = pad(styled.div`
  padding: 0 ${size('spacing.large')};
`);

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.regular')};
`;

const RejectButton = styled(StyledButton)`
  border-color: ${palette('slate.stroke')};
  margin-bottom: 0;
`;

const EntryModal = ({ isOpen, onClose, content }) => {
  const { title, description } = content;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <HeaderWithClose onClose={onClose} >{title}?</HeaderWithClose>
      <Content>
        <IconItems>
          <IconItem iconSize="caption" icon="check">{description}</IconItem>
          <IconItem iconSize="caption" icon="check">Get pricing, availability and community insights</IconItem>
          <IconItem iconSize="caption" icon="check">They will schedule tours and negotiate fees</IconItem>
        </IconItems>
        <StyledButton onClick={onClose}>Wait, yes, I want free expert help!</StyledButton>
      </Content>
    </Modal>
  );
};

EntryModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  content: object.isRequired,

};

export default EntryModal;
