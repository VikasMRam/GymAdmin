import React from 'react';
import { object, string } from 'prop-types';

import Button from 'sly/components/atoms/Button';
import AskAgentQuestionContainer from 'sly/containers/AskAgentQuestionContainer';

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