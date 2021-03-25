import Helmet from 'react-helmet';
import React from 'react';
import { bool, object, string } from 'prop-types';

import { host } from 'sly/web/config';
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';

const stringifyReplacer = (k, v) => {
  if (k === 'hash' || k === 'key') {
    return undefined;
  }
  return v;
};

const HelmetComponent = ({
  path,
  title,
  shortDescription,
  isArticlePage,
  published_at: publishedAt,
  updated_at: updatedAt,
  author,
  mainImage,
}) => {
  const mainLd = {};
  mainLd['@context'] = 'http://schema.org';
  mainLd['@type'] = 'WebPage';
  mainLd.headline = `${title} | Seniorly`;
  mainLd.url = `${host}${RESOURCE_CENTER_PATH}${path}`;

  const articleLd = {};

  if (isArticlePage) {
    articleLd['@context'] = 'http://schema.org';
    articleLd['@type'] = 'Article';
    articleLd.mainEntityOfPage = `${host}${RESOURCE_CENTER_PATH}${path}`;
    articleLd.headline = title;
    articleLd.datePublished = publishedAt;
    articleLd.dateModified = updatedAt;
    articleLd.description = shortDescription;
    articleLd.author = {
      '@type': 'Person',
      name: author.fullName,
    };
    articleLd.publisher = {
      '@type': 'Organization',
      name: 'Seniorly',
      logo: {
        '@type': 'ImageObject',
        url: 'https://d1qiigpe5txw4q.cloudfront.net/assets/footer_logo.png',
        width: 84,
        height: 42,
      },
    };
    articleLd.image = {
      '@type': 'ImageObject',
      url: mainImage.url,
      height: 500,
      width: 800,
    };
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={shortDescription} />
      <meta content="Seniorly" name="author" />
      <meta content="English" name="language" />
      <meta content="summary" name="twitter:card" />
      <meta content="@seniorly" name="twitter:site" />
      <meta content={`${title} | Seniorly`} name="twitter:title" />
      <meta content={shortDescription} name="twitter:description" />
      <meta content="@seniorly" name="twitter:creator" />
      <meta content={`${title} | Seniorly`} property="og:title" />
      <meta content={shortDescription} property="og:description" />
      <meta content="website" property="og:type" />
      <meta content={`${host}${RESOURCE_CENTER_PATH}${path}`} property="og:url" />
      <meta content={host} property="og:site_url" />
      <meta content="Seniorly Inc." property="og:site_name" />
      <link rel="canonical" href={`${host}${RESOURCE_CENTER_PATH}${path}`} />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <script type="application/ld+json">{`${JSON.stringify(mainLd, stringifyReplacer)}`}</script>
      {isArticlePage && <script type="application/ld+json">{`${JSON.stringify(articleLd, stringifyReplacer)}`}</script>}
    </Helmet>
  );
};

HelmetComponent.propTypes = {
  title: string.isRequired,
  shortDescription: string.isRequired,
  path: string,
  isArticlePage: bool,
  published_at: string,
  updated_at: string,
  author: object,
  mainImage: object,
};

HelmetComponent.defaultProps = {
  path: '',
  isArticlePage: false,
  author: {},
  mainImage: {},
};

export default HelmetComponent;
