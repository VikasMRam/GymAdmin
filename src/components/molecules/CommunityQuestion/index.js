import React from 'react';
import { string } from 'prop-types';

import { question as questionPropType } from 'sly/propTypes/question';
import { Block } from 'sly/components/atoms';

const CommunityQuestion = ({ question, className }) => {
  const { contentData } = question;

  return (
    <article className={className}>
      <Block size="subtitle" weight="regular">{contentData}{contentData.slice(-1) !== '?' && '?'}</Block>
    </article>
  );
};

CommunityQuestion.propTypes = {
  question: questionPropType.isRequired,
  className: string,
};

export default CommunityQuestion;
