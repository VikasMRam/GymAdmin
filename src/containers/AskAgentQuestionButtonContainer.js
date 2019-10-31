import React from 'react';
import { object, string } from 'prop-types';

import Button from 'sly/components/atoms/Button';
import WiredAskAgentQuestionContainer from 'sly/containers/AskAgentQuestionContainer';

export default function AskAgentQuestionButtonContainer({
  type,
  community,
  ...props
}) {
  return (
    <WiredAskAgentQuestionContainer type={type} community={community}>
      {askAgent => <Button {...props} onClick={askAgent} />}
    </WiredAskAgentQuestionContainer>
  );
}
AskAgentQuestionButtonContainer.typeHydrationId = 'AskAgentQuestionButtonContainer';
AskAgentQuestionButtonContainer.propTypes = {
  type: string,
  community: object
};
