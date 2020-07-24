import React from 'react';
import { string } from 'prop-types';

import { Button } from 'sly/web/components/atoms';
import AskAgentQuestionContainer from 'sly/web/containers/AskAgentQuestionContainer';

export default function AskAgentQuestionButtonContainer({
  type,
  ...props
}) {
  return (
    <AskAgentQuestionContainer type={type}>
      {askAgent => <Button {...props} onClick={askAgent} />}
    </AskAgentQuestionContainer>
  );
}
AskAgentQuestionButtonContainer.typeHydrationId = 'AskAgentQuestionButtonContainer';
AskAgentQuestionButtonContainer.propTypes = {
  type: string,
};
