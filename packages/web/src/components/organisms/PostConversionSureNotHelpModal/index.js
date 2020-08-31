import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import { size } from 'sly/common/components/themes';
import Modal, { HeaderWithClose } from 'sly/web/components/atoms/NewModal';
import { Heading, Button } from 'sly/web/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import pad from 'sly/web/components/helpers/pad';
import { community as communityPropType } from 'sly/common/propTypes/community';

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
`;

const PostConversionSureNotHelpModal = ({ community, onDismiss }) => {
  const { propInfo: { ownerEmail, communityPhone } } = community;
  const hasContactData = ownerEmail || communityPhone;
  return (
    <Modal onClose={onDismiss}>
      <HeaderWithClose onClose={onDismiss} />
      <Content>
        <PaddedHeading level="subtitle">
          {hasContactData && <>Here is the direct contact for {community.name}</>}
          {!hasContactData && <>Unfortunately we don't have direct contact information for {community.name}</>}
        </PaddedHeading>
        <IconItems>
          {ownerEmail && <IconItem iconSize="caption" icon="email">{ownerEmail}</IconItem>}
          {communityPhone && <IconItem iconSize="caption" icon="phone">{communityPhone}</IconItem>}
        </IconItems>
        <StyledButton onClick={onDismiss}>Click Here to Browse Similar Communities</StyledButton>
      </Content>
    </Modal>
  );
};

PostConversionSureNotHelpModal.propTypes = {
  onAccept: func.isRequired,
  onDismiss: func.isRequired,
  community: communityPropType,
};

export default PostConversionSureNotHelpModal;
