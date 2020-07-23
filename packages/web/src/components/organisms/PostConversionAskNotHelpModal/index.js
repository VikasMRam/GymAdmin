import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import { palette, size } from 'sly/common/components/themes';
import Modal, { HeaderWithClose } from 'sly/web/components/atoms/NewModal';
import Heading from 'sly/web/components/atoms/Heading';
import Button from 'sly/web/components/atoms/Button';
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

const PostConversionAskNotHelpModal = ({ onReject, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <HeaderWithClose onClose={onClose} />
      <Content>
        <PaddedHeading level="subtitle">Are you sure you don’t want help?</PaddedHeading>
        <IconItems>
          <IconItem iconSize="caption" icon="check">Working with our experts is 100% free</IconItem>
          <IconItem iconSize="caption" icon="check">Get pricing, availability and community insights</IconItem>
          <IconItem iconSize="caption" icon="check">They will schedule tours and negotiate fees</IconItem>
        </IconItems>
        <StyledButton onClick={onClose}>Wait, yes, I want free expert help!</StyledButton>
        <RejectButton ghost palette="danger" onClick={onReject}>I don’t want expert help</RejectButton>
      </Content>
    </Modal>
  );
};

PostConversionAskNotHelpModal.propTypes = {
  onReject: func.isRequired,
  onClose: func.isRequired,
};

export default PostConversionAskNotHelpModal;
