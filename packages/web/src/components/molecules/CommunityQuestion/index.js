import React from 'react';
import { string } from 'prop-types';

import { content as contentPropType } from 'sly/propTypes/content';
import { Block } from 'sly/components/atoms';

const CommunityQuestion = ({ question, className }) => {
  const { contentData } = question;

  return (
    <article className={className}>
      <Block size="subtitle" weight="regular">{contentData}</Block>
    </article>
  );
};

CommunityQuestion.propTypes = {
  question: contentPropType.isRequired,
  className: string,
};

export default CommunityQuestion;