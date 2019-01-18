import React from 'react';

import { answer as answerPropType } from 'sly/propTypes/answer';
import { Block } from 'sly/components/atoms';

const CommunityAnswer = ({ answer }) => {
  const { contentData } = answer;
  return (
    <article>
      <Block palette="grey">{contentData}</Block>
    </article>
  );
};

CommunityAnswer.propTypes = {
  answer: answerPropType.isRequired,
};

export default CommunityAnswer;
