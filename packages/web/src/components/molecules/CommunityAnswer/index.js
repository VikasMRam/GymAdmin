import React from 'react';

import { content as contentPropType } from 'sly/propTypes/content';
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
  answer: contentPropType.isRequired,
};

export default CommunityAnswer;