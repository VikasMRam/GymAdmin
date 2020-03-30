import React, { useState } from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { Block, Box, Button, Heading } from 'sly/components/atoms';
import shadow from 'sly/components/helpers/shadow';
import Icon from 'sly/components/atoms/Icon';
import pad from 'sly/components/helpers/pad';

import { community as communityProptype } from 'sly/propTypes/community';
import PostConversionAskNotHelpModal from 'sly/components/organisms/PostConversionAskNotHelpModal';
import PostConversionSureNotHelpModal from 'sly/components/organisms/PostConversionSureNotHelpModal';
import PostConversionAdTileContainer from 'sly/containers/postConversion/AdTileContainer';
import { getCitySearchWithSizeUrl } from 'sly/services/helpers/url';

const DO_NOT_REFER = 'do-not-refer';
const ASK_NOT_HELP = 'AskNotHelp';
const SURE_NOT_HELP = 'SureNotHelp';

const Wrapper = styled(shadow(Box))`
  margin: 0 auto ${size('spacing.xLarge')} auto;
  padding: ${size('spacing.xxLarge')} ${size('spacing.xLarge')};
  width: ${size('mobileLayout.col4')};
  > ${Icon} {
    margin-bottom: ${size('spacing.large')};
  }
  > ${Heading} {
    text-align: center;
    margin-bottom: ${size('spacing.xLarge')};
  }
  > :last-child {
    margin-bottom: 0;
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col6')};
  }
`;

const TextWrapper = styled(Wrapper)`
  text-align: center;
`;

const PaddedBlock = pad(Block, 'xLarge');

const RejectButton = styled(Button)`
  border-color: ${palette('slate.stroke')};
  width: 100%;
  margin-bottom: 0;
`;

const PostConversionGreetingForm = ({
  onSubmit, community,
}) => {
  const [currentModal, setCurrentModal] = useState(null);

  const closeModal = () => setCurrentModal(null);
  const doReject = () => onSubmit({ interest: DO_NOT_REFER }).then(() => setCurrentModal(SURE_NOT_HELP));
  const doDismiss = () => onSubmit({ redirectLink: getCitySearchWithSizeUrl(community) });

  return (
    <div>
      <TextWrapper>
        <Icon icon="checkmark-circle" size="xLarge" palette="green" />
        <Heading level="subtitle">You’re all set! Your Local Senior Living Expert will reach out shortly.</Heading>
        <PaddedBlock>Did you know your local expert can often negotiate fees on your behalf?</PaddedBlock>
        <RejectButton ghost palette="primary" onClick={doDismiss}>See similar communities in the area.</RejectButton>
      </TextWrapper>
      <Wrapper>
        <PostConversionAdTileContainer notifyInfo={closeModal} type="homeCare" community={community}/>
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
  handleSubmit: func.isRequired,
};

export default PostConversionGreetingForm;
