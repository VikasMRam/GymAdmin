import React, { useState } from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/web/components/themes';
import { Block, Box, Button, Heading } from 'sly/web/components/atoms';
import pad from 'sly/web/components/helpers/pad';
import { community as communityProptype } from 'sly/web/propTypes/community';
import PostConversionAskNotHelpModal from 'sly/web/components/organisms/PostConversionAskNotHelpModal';
import PostConversionSureNotHelpModal from 'sly/web/components/organisms/PostConversionSureNotHelpModal';

const DO_NOT_REFER = 'do-not-refer';
const ASK_NOT_HELP = 'AskNotHelp';
const SURE_NOT_HELP = 'SureNotHelp';

const Wrapper = styled(Box)`
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

const PaddedBlock = pad(Block, 'xLarge');

const RejectButton = styled(Button)`
  border-color: ${palette('slate.stroke')};
  width: 100%;
  margin-bottom: 0;
`;

const PostConversionGreetingForm = ({
  onSubmit, community, heading, description, className,
}) => {
  const [currentModal, setCurrentModal] = useState(null);

  const closeModal = () => setCurrentModal(null);
  const doReject = () => onSubmit({ interest: DO_NOT_REFER }).then(() => setCurrentModal(SURE_NOT_HELP));
  const doDismiss = () => onSubmit({ redirectLink: community ? community.url : '/' });

  return (
    <div className={className}>
      <Wrapper>
        <Heading level="subtitle">{heading}</Heading>
        {description && <PaddedBlock>{description}</PaddedBlock>}
        <RejectButton palette="primary" onClick={doDismiss} to={community ? community.url : '/'}>
          Return to {community ? 'Profile' : 'Home'}
        </RejectButton>
      </Wrapper>
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
  onSubmit: func.isRequired,
  heading: string.isRequired,
  description: string,
  className: string,
};

PostConversionGreetingForm.defaultProps = {
  heading: "You're all set! A local senior living expert will reach out shortly.",
};

export default PostConversionGreetingForm;
