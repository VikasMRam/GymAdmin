import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import Modal, { HeaderWithClose } from 'sly/components/atoms/NewModal';
import Heading from 'sly/components/atoms/Heading';
import Button from 'sly/components/atoms/Button';
import IconItem from 'sly/components/molecules/IconItem';
import { palette, size } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';

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

const PostConversionAskNotHelpModal = ({ onDismiss, onAccept }) => {
  return (
    <Modal onClose={onDismiss}>
      <HeaderWithClose onClose={onDismiss} />
      <Content>
        <PaddedHeading level="subtitle">Are you sure you don’t want help?</PaddedHeading>
        <IconItems>
          <IconItem iconSize="caption" icon="check">Working with our experts is 100% free</IconItem>
          <IconItem iconSize="caption" icon="check">Get pricing, availability and community insights</IconItem>
          <IconItem iconSize="caption" icon="check">They will schedule tours and negotiate fees</IconItem>
        </IconItems>
        <StyledButton onClick={onAccept}>Wait, yes, I want free expert help!</StyledButton>
        <RejectButton ghost palette="danger" onClick={onDismiss}>I don’t want expert help</RejectButton>
      </Content>
    </Modal>
  );
};

PostConversionAskNotHelpModal.propTypes = {
  onAccept: func.isRequired,
  onDismiss: func.isRequired,
};

export default PostConversionAskNotHelpModal;
