import React from 'react';
import { bool, number, string } from 'prop-types';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import ArticlesList from 'sly/web/components/resourceCenter/components/ArticlesList';

const ArticlesListByTopic = ({ limit: _limit, topic, id, withRedirectToTopicPage, articlesTitle }) => {
  const { requestInfo } = usePrefetch('getArticle', req => req({
    'mainTopic.slug': topic,
    _sort: 'viewCount:DESC',
    _limit,
    ...(!withRedirectToTopicPage && { id_ne: id }),
  }));

  if ((requestInfo.hasFinished && !requestInfo?.result?.length) || !requestInfo.hasFinished) return null;

  return (
    <ArticlesList {...{ topic, withRedirectToTopicPage, articlesTitle, articles: requestInfo.result }} />
  );
};

ArticlesListByTopic.propTypes = {
  limit: number,
  topic: string,
  id: number,
  withRedirectToTopicPage: bool,
  articlesTitle: string,
};

export default ArticlesListByTopic;
