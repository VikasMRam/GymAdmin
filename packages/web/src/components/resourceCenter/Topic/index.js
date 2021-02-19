import React from 'react';
import { object } from 'prop-types';

import Block from 'sly/common/components/atoms/Block';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import { topics } from 'sly/web/components/resourceCenter/helper';
import Header from "sly/web/components/resourceCenter/Header";

const Topic = ({ match }) => {
  const { topic } = match.params;

  const { requestInfo } = usePrefetch(
    'getArticle',
      req => req({ topic_eq: topics.find(({ value }) => value.replace(/\s/g, '-').toLowerCase() === topic)?.label || '' }));
  return (
    <Block>
      <Header />
      <Block>

      </Block>
    </Block>
  );
};

Topic.propTypes = {
  match: object,
};

export default Topic;
