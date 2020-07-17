import React, { useState } from 'react';
import { func, string, node, bool } from 'prop-types';
import styled, { css } from 'styled-components';

import { size, palette } from 'sly/web/components/themes';
import { Block, Box, Button, Heading } from 'sly/web/components/atoms';
import pad from 'sly/web/components/helpers/pad';
import { community as communityProptype } from 'sly/common/propTypes/community';
import PostConversionAskNotHelpModal from 'sly/web/components/organisms/PostConversionAskNotHelpModal';
import PostConversionSureNotHelpModal from 'sly/web/components/organisms/PostConversionSureNotHelpModal';

const DO_NOT_REFER = 'do-not-refer';
const ASK_NOT_HELP = 'AskNotHelp';
const SURE_NOT_HELP = 'SureNotHelp';

const wrapperStyles = css`
  padding: ${size('spacing.xxLarge')} ${size('spacing.xLarge')};
  > ${Heading} {
    margin-bottom: ${size('spacing.xLarge')};
  }
  > :last-child {
    margin-bottom: 0;
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col6')};
  }
`;

const BoxWrapper = styled(Box)`
  ${wrapperStyles}
`;

const Wrapper = styled.div`
  ${wrapperStyles}
  padding: 0;
  width: auto!important;
`;

const LargePaddedBlock = pad(Block, 'large');

const PaddedBlock = pad(Block);

const RejectButton = styled(Button)`
  border-color: ${palette('slate.stroke')};
  width: 100%;
  margin-bottom: 0;
`;

const PostConversionGreetingForm = ({
  onSubmit, community, heading, description, className, children, hasBox, onReturnClick,
}) => {
  const [currentModal, setCurrentModal] = useState(null);
  const ContentWrapper = hasBox ? BoxWrapper : Wrapper;

  const closeModal = () => setCurrentModal(null);
  const doReject = () => onSubmit({ interest: DO_NOT_REFER }).then(() => setCurrentModal(SURE_NOT_HELP));
  const doDismiss = () => onSubmit({ redirectLink: community ? community.url : '/' });
  const toUrl = community ? community.url : '/';

  return (
    <div className={className}>
      <ContentWrapper>
        <Heading level="subtitle">{heading}</Heading>
        {description && <LargePaddedBlock>{description}</LargePaddedBlock>}
        {children && <PaddedBlock>{children}</PaddedBlock>}
        <RejectButton palette="primary" onClick={onReturnClick || doDismiss} to={onReturnClick ? null : toUrl}>
          Return to {community ? 'Profile' : 'Home'}
        </RejectButton>
      </ContentWrapper>
      {currentModal === ASK_NOT_HELP && (
        <PostConversionAskNotHelpModal onReject={doReject} onClose={closeModal} />
      )}
      {currentModal === SURE_NOT_HELP && (
        <PostConversionSureNotHelpModal community={community} onDismiss={doDismiss} onAccept={closeModal} />
      )}
    </div>
  );
};

PostConversionGreetingForm.propTypes = {
  community: communityProptype,
  onSubmit: func,
  heading: string.isRequired,
  description: string,
  className: string,
  children: node,
  hasBox: bool,
  onReturnClick: func,
};

PostConversionGreetingForm.defaultProps = {
  heading: "You're all set! A local senior living expert will reach out shortly.",
  hasBox: true,
  onSubmit: _ => _,
};

export default PostConversionGreetingForm;
