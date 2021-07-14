import React, { useMemo } from 'react';
import { Redirect } from 'react-router';
import { components } from 'react-select';
import { bool, object } from 'prop-types';
import styled, { css } from 'styled-components';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import {
  isActiveTab,
  getTextForPagination,
  onChangeTagsSelect,
  getSearchItem,
  getTagsSelectDefaultValue,
  getTagsOptionByTopic,
  toUppercaseAndSnakeCase,
  ARTICLES_RANGE_FOR_PAGINATION,
} from 'sly/web/components/resourceCenter/helper';
import { assetPath } from 'sly/web/components/themes';
import { RESOURCE_CENTER_PATH } from 'sly/web/dashboard/dashboardAppPaths';
import Footer from 'sly/web/components/organisms/Footer';
import Pagination from 'sly/web/components/molecules/Pagination';
import { sx, space, border, color } from 'sly/common/system/sx';
import Block from 'sly/common/system/Block';
import Grid from 'sly/common/system/Grid';
import Flex from 'sly/common/system/Flex';
import Image from 'sly/common/system/Image';
import Hr from 'sly/common/system/Hr';
import Link from 'sly/common/system/Link';
import Select from 'sly/web/components/atoms/Select';
import ArrowDrop from 'sly/common/icons/ArrowDrop';
import ArticlePreview from 'sly/web/components/resourceCenter/components/ArticlePreview';
import SubscribeEmail from 'sly/web/components/resourceCenter/components/SuscribeEmails';
import Header from 'sly/web/components/resourceCenter/components/Header';
import Helmet from 'sly/web/components/resourceCenter/components/Helmet';

const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <ArrowDrop rotation={props.isFocused ? '0' : '180'} color="slate.base" />
  </components.DropdownIndicator>
);

DropdownIndicator.propTypes = {
  isFocused: bool,
};

const Option = props => <components.Option {...props} />;

const TabsItem = styled(Block)`
  cursor: pointer;
  text-transform: uppercase;
`;

const wrapperCustomStyles = css`
  .react-select__control {
    border-bottom-left-radius: ${border('l')};
    border-bottom-right-radius: ${border('l')};
  }
  .react-select__menu {
    border-radius: ${border('l')};
    overflow: hidden;
    margin-top: ${space('xs')};

    &-list {
      max-height: max-content;
    }
  }
  .react-select__option {
    padding: ${space('m')} 0 ${space('m')} ${space('l')};

    &:hover {
      background: ${color('viridian.lighter-90')};
    }

    &:active {
      background: ${color('viridian.base')};
    }
  }
  .react-select__value-container > .react-select__single-value {
    color: ${color('slate.base')};
  }
  .react-select__option, .react-select__placeholder, .react-select__single-value {
    ${sx({ font: 'body-m' })}
  }
  .react-select__option--is-selected {
    font-weight: 400;
    background: ${color('viridian.base')};
    color: ${color('white.base')};

    &:hover, &:active {
      background: ${color('viridian.base')};
    }
  }
`;

const PaginationText = styled(Block)`
  text-align: center;
`;

const Topic = ({ match, location, history }) => {
  const { topic: topicSlug } = match.params;
  const { search } = location;
  const tagsOptions = useMemo(() => getTagsOptionByTopic(topicSlug), [topicSlug]);
  const pageNumber = useMemo(() => getSearchItem(search, 'page-number') || 0, [location]);
  const tagName = useMemo(() => getSearchItem(search, 'tag-name'), [location]);
  const tagNameSearchItem = useMemo(() => {
    const item = getSearchItem(search, 'tag-name', true);
    return item ? `?${item}` : '';
  }, [search]);

  const { requestInfo: { result: topicRes , hasFinished: requestByTopicHasFinished } } = usePrefetch(
    'getTopic',
    { slug: topicSlug, },
  );

  const { requestInfo: { result: articlesCount, hasFinished: requestByCountHasFinished } } = usePrefetch(
    'getArticlesCount',
    {
      'mainTopic.slug': topicSlug,
      ...(tagNameSearchItem && { tagsSlug_contains: toUppercaseAndSnakeCase(tagName) }),
    },
  );

  const { requestInfo: { result: articles, hasFinished: requestByArticlesHasFinished } } = usePrefetch(
    'getArticle',
    {
      'mainTopic.slug': topicSlug,
      ...(tagNameSearchItem && { tagsSlug_contains: toUppercaseAndSnakeCase(tagName) }),
      _start: pageNumber ? pageNumber * ARTICLES_RANGE_FOR_PAGINATION : 0,
      _limit: ARTICLES_RANGE_FOR_PAGINATION,
    }
  );

  if (
    (!topicRes?.[0] && requestByTopicHasFinished) ||
    (tagName && tagsOptions && !(tagsOptions.filter(({ value }) => value === tagName).length)) ||
    (tagName && !tagsOptions)
  ) {
    return <Redirect to={RESOURCE_CENTER_PATH} />;
  }

  if (!requestByArticlesHasFinished || !requestByCountHasFinished || !requestByTopicHasFinished) {
    return (
      <Flex
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={assetPath('images/homebase/loader.svg')} />
      </Flex>
    );
  }


  return (
    <>
      <Helmet
        path={`/${topicRes?.[0]?.slug}`}
        title={`Expert resources on ${topicRes?.[0]?.name}`}
        shortDescription={topicRes?.description}
      />

      <Header />

      <Block background="black" width="100%" position="relative">
        <Block
          sx={{
            zIndex: 1,
            position: 'relative',
            padding: '3rem 1rem 2.5rem',
            color: 'white.base',
          }}
          sx$tablet={{ padding: '5rem 0', width: 'col8', marginX: 'auto' }}
          sx$laptop={{ width: 'col12' }}
        >
          <Link
            to={RESOURCE_CENTER_PATH}
            font="body-m"
            color="white.base"
          >
            Resource Center Home
          </Link>
          <Block
            font="title-xxl"
            marginBottom="l"
            mt="m"
          >
            {topicRes?.[0].name}
          </Block>
          <Block font="body-l">
            {topicRes?.[0].description}
          </Block>
        </Block>
        <Image
          css={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity:'.45' }}
          sources={[320, 425, 728, 1080, 1200]}
          sizes="100vw"
          path={topicRes?.[0].img?.path}
        />
      </Block>

      {tagsOptions && (
        <>
          <Block
            margin="l m"
            sx$tablet={{ marginX: 'auto', width: 'col8' }}
            sx$laptop={{ display: 'none' }}
          >
            <Select
              size="large"
              wrapperCustomStyles={wrapperCustomStyles}
              components={{ DropdownIndicator, Option }}
              defaultValue={getTagsSelectDefaultValue(search, topicSlug)}
              onChange={onChangeTagsSelect(search, history)}
              options={tagsOptions}
            />
          </Block>
          <Block
            marginX="auto"
            width="col12"
            display="none"
            sx$laptop={{ display: 'flex' }}
          >
            {tagsOptions.map(({ value, label }, index) => (
              <TabsItem
                key={value}
                paddingTop="m"
                paddingBottom={isActiveTab(search, value) ? 's' : 'm'}
                marginRight={tagsOptions.length - 1 !== index && 'l'}
                font="label"
                color={isActiveTab(search, value) ? 'viridian.base' : 'slate.lighter-40'}
                isActiveTab={isActiveTab(search, value)}
                borderBottom={isActiveTab(search, value) && 'l'}
                borderColor={isActiveTab(search, value) && 'viridian.base'}
                onClick={() => onChangeTagsSelect(search, history)({ value })}
              >
                {label}
              </TabsItem>
            ))}
          </Block>
          <Block display="none" marginBottom="xxl" sx$laptop={{ display: 'block' }}>
            <Hr />
          </Block>
        </>
      )}

      {articlesCount && (
        <Grid
          marginTop="l"
          marginBottom="xxl"
          marginX="auto"
          width="max-content"
          gridRowGap="m"
          sx$tablet={{
            gridTemplateColumns: 'col4 col4',
            gridColumnGap: 'l',
            gridRowGap: 'l',
          }}
          sx$laptop={{
            gridTemplateColumns: 'col4 col4 col4',
          }}
        >
          {articles?.map(({
              title,
              shortDescription,
              mainImg,
              slug,
              mainTopic,
              tagsList,
              id,
            }) => (
              <ArticlePreview
                {...{
                  alternativeText: mainImg?.alternativeText,
                  title,
                  shortDescription,
                  path: mainImg?.path,
                  topic: mainTopic,
                  tagsList,
                  to: `${RESOURCE_CENTER_PATH}/${mainTopic.slug}/${slug}`,
                  key: id,
                }}
              />
          ))}
        </Grid>
      )}

      {!articlesCount && requestByCountHasFinished && (
        <Block
          font="body-l"
          marginX="m"
          marginTop="xl"
          marginBottom="xxl"
          sx$tablet={{ width: 'col8', marginX: 'auto' }}
          sx$laptop={{ width: 'col12' }}
        >
          There are no articles found by this request
        </Block>
      )}

      {articlesCount && (
        <Block marginX="auto" marginBottom="xxl" width="max-content">
          {articlesCount > ARTICLES_RANGE_FOR_PAGINATION && (
            <Pagination
              basePath={`${RESOURCE_CENTER_PATH}/${topicSlug}${tagNameSearchItem}`}
              pageParam="page-number"
              total={articlesCount / ARTICLES_RANGE_FOR_PAGINATION}
              current={+pageNumber}
              range={ARTICLES_RANGE_FOR_PAGINATION}
            />
          )}

          <PaginationText marginTop="m">
            {getTextForPagination(pageNumber, articlesCount)}
          </PaginationText>
        </Block>
      )}

      <SubscribeEmail />

      <Footer />
    </>
  );
};

Topic.propTypes = {
  match: object,
  location: object,
  history: object,
};

export default Topic;
