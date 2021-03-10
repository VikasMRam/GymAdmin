import React, { useMemo } from 'react';
import { object } from 'prop-types';
import { Redirect } from 'react-router';
import styled, { css } from 'styled-components';
import { components } from 'react-select';

import Block from 'sly/common/components/atoms/Block';
import Select from 'sly/web/components/atoms/Select';
import Header from 'sly/web/components/resourceCenter/components/Header';
import Footer from 'sly/web/components/organisms/Footer';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import {
  topics,
  isActiveTab,
  getTextForPagination,
  onChangeTagsSelect,
  getSearchItem,
  getTagsSelectDefaultValue,
  getTagsOptionByTopic,
  changeRegisterWithReplace,
  ARTICLES_RANGE_FOR_PAGINATION,
} from 'sly/web/components/resourceCenter/helper';
import { assetPath } from "sly/web/components/themes";
import { withDisplay, withBorder } from "sly/common/components/helpers";
import { getKey, palette, size } from "sly/common/components/themes";
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import Pagination from 'sly/web/components/molecules/Pagination';
import Link from "sly/common/components/atoms/Link";
import ArticlePreview from "sly/web/components/resourceCenter/components/ArticlePreview";
import Icon from "sly/common/components/atoms/Icon";
import ResponsiveImage from "sly/web/components/atoms/ResponsiveImage";
import Helmet from "react-helmet";
import Hr from "sly/common/components/atoms/Hr";

const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <Icon icon="arrow-drop-down" flip={props.isFocused} palette="slate.base" />
  </components.DropdownIndicator>
);

const Option = props => <components.Option {...props} />;

const LoaderWrapper = styled(Block)(withDisplay);

const MainTextWrapper = styled(Block)(
  withDisplay,
  css`
    z-index: 1;
    position: relative;
  `,
);

const MainBlockWrapper = styled(Block)(
  css`
    position: relative;
  `,
);

const TabsItem = styled(Block)(
  withBorder,
  css`
    cursor: pointer;
    text-transform: uppercase;
  `
);

const wrapperCustomStyles = css`
  .react-select__control {
    border-bottom-left-radius: ${size('border.xxLarge')};
    border-bottom-right-radius: ${size('border.xxLarge')};
  }
  .react-select__menu {
    border-radius: ${size('border.xxLarge')};
    overflow: hidden;
    margin-top: ${size('spacing.xs')};

    &-list {
      max-height: max-content;
    }
  }
  .react-select__option {
    padding: ${size('spacing.m')} 0 ${size('spacing.m')} ${size('spacing.l')};

    &:hover {
      background: ${palette('viridian', 'lighter-90')};
    }

    &:active {
      background: ${palette('viridian', 'base')};
    }
  }
  .react-select__value-container > .react-select__single-value {
    color: ${palette('slate', 'base')};
  }
  .react-select__option, .react-select__placeholder, .react-select__single-value {
    font-size: ${size('text.body')};
  }
  .react-select__option--is-selected {
    font-weight: 400;
    background: ${palette('viridian', 'base')};
    color: ${palette('white', 'base')};

    &:hover, &:active {
      background: ${palette('viridian', 'base')};
    }
  }
`;

const PaginationText = styled(Block)(
  css`
    text-align: center;
  `,
);

const Topic = ({ match, location, history }) => {
  const { topic } = match.params;
  const { search } = location;
  const topicValue = useMemo(() => topics.find(({ label }) => label === changeRegisterWithReplace(topic, '-', '_'))?.value, [topic]);
  const tagsOptions = useMemo(() => getTagsOptionByTopic(topic), [topic]);
  const pageNumber = useMemo(() => getSearchItem(search, 'page-number') || 0, [location]);
  const tagName = useMemo(() => getSearchItem(search, 'tag-name'), [location]);
  const tagNameSearchItem = useMemo(() => {
    const item = getSearchItem(search, 'tag-name', true);
    return item ? '?' + item : ''
  }, [search]);

  const { requestInfo: { result: articlesCount, hasFinished: requestByCountHasFinished } } = usePrefetch(
    'getArticlesCount',
    req => req({
      topic_eq: changeRegisterWithReplace(topic, '-', '_'),
      ...(tagNameSearchItem && { tagsSlug_contains:  changeRegisterWithReplace(tagName, '-', '_') }),
    }),
  );

  const { requestInfo: { result: articles, hasFinished: requestByArticlesHasFinished } } = usePrefetch(
    'getArticle',
    req => req({
      topic_eq: changeRegisterWithReplace(topic, '-', '_'),
      ...(tagNameSearchItem && { tagsSlug_contains:  changeRegisterWithReplace(tagName, '-', '_') }),
      _start: pageNumber ? pageNumber * ARTICLES_RANGE_FOR_PAGINATION : 0,
      _limit: ARTICLES_RANGE_FOR_PAGINATION,
    }));

  if (
    !topicValue ||
    (tagName && tagsOptions && !tagsOptions.find(({ value }) => value !== changeRegisterWithReplace(topicValue, '-', '_'))) ||
    (tagName && !tagsOptions)
  ) {
    return <Redirect to={RESOURCE_CENTER_PATH} />;
  }

  if (!requestByArticlesHasFinished || !requestByCountHasFinished) {
    return (
      <LoaderWrapper
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ResponsiveImage src={assetPath('images/homebase/loader.svg')} />
      </LoaderWrapper>
    );
  }

  return (
    <>
      <Helmet>
        /* todo: Unmock title */
        <title>Title</title>
        /* todo: Unmock description */
        <meta name="description" content="Description" />
      </Helmet>

      <Header />

      <MainBlockWrapper width="100%">
        <MainTextWrapper
          padding="3rem 1rem 2.5rem"
          startingWithTablet={{ padding: '5rem 0', width: size('layout.col8'), marginX: 'auto' }}
          startingWithLaptop={{ width: size('layout.col12') }}
        >
          <Block font="body-regular" marginBottom="l" palette="white">Resource Center Home</Block>
          <Block
            font="title-xxlarge"
            marginBottom="l"
            palette="white"
          >
            {topicValue}
          </Block>
          <Block font="body-regular" palette="white">
            Learn how to navigate senior living, from what to look for in a community, finance, move-in tips and more.
          </Block>
        </MainTextWrapper>
        <ResponsiveImage
          css={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        />
      </MainBlockWrapper>

      {tagsOptions && (
        <>
          <Block
            marginX="m"
            marginY="l"
            startingWithTablet={{ marginX: 'auto', width: size('layout.col8') }}
            startingWithLaptop={{ display: 'none' }}
          >
            <Select
              size="large"
              wrapperCustomStyles={wrapperCustomStyles}
              components={{ DropdownIndicator, Option }}
              defaultValue={getTagsSelectDefaultValue(search, topic)}
              onChange={onChangeTagsSelect(search, history)}
              options={tagsOptions}
            />
          </Block>
          <Block
            marginX="auto"
            width={size('layout.col12')}
            upToLaptop={{ display: 'none' }}
            startingWithLaptop={{ display: 'flex' }}
          >
            {tagsOptions.map(({ value, label }, index) => (
              <TabsItem
                key={value}
                paddingTop="m"
                paddingBottom={isActiveTab(search, value) ? 's' : 'm'}
                marginRight={tagsOptions.length - 1 !== index && 'l'}
                font="label"
                palette={isActiveTab(search, value) ? 'viridian' : 'grey'}
                isActiveTab={isActiveTab(search, value)}
                borderBottom={isActiveTab(search, value) && 'xxLarge'}
                borderPalette={isActiveTab(search, value) && 'viridian'}
                borderVariation={isActiveTab(search, value) && 'base'}
                onClick={() => onChangeTagsSelect(search, history)({ value })}
              >
                {label}
              </TabsItem>
            ))}
          </Block>
          <Block display="none" marginBottom="xxl" startingWithLaptop={{ display: 'block' }}>
            <Hr size="large" />
          </Block>
        </>
      )}

      {articlesCount && (
        <Block
          marginTop="l"
          marginBottom="xxl"
          marginX="auto"
          width="max-content"
          startingWithTablet={{
            display: 'grid',
            gridTemplateColumns: `${getKey('sizes.layout.col4')} ${getKey('sizes.layout.col4')}`,
            columnGap: size('spacing.l'),
            rowGap: size('spacing.l'),
          }}
          startingWithLaptop={{
            gridTemplateColumns: `${getKey('sizes.layout.col4')} ${getKey('sizes.layout.col4')} ${getKey('sizes.layout.col4')}`,
          }}
        >
          {articles?.map(({
              title,
              shortDescription,
              mainImg,
              slug,
              topic,
              tagsList,
              id,
            }) => (
            <Link to={`/resources/articles/${topic.toLowerCase().replace(/_/g, '-')}/${slug}`} key={id}>
              <ArticlePreview
                {...{
                  alternativeText: mainImg?.alternativeText,
                  title,
                  shortDescription,
                  url: mainImg?.url,
                  topic,
                  tagsList,
                }}
              />
            </Link>
          ))}
        </Block>
      )}

      {!articlesCount && requestByCountHasFinished && (
        <Block
          font="body-large"
          marginX="m"
          marginTop="xl"
          marginBottom="xxl"
          startingWithTablet={{ width: size('layout.col8'), marginX: 'auto' }}
          startingWithLaptop={{ width: size('layout.col12') }}
        >
          There are no articles found by this request
        </Block>
      )}

      {articlesCount && (
        <Block marginX="auto" marginBottom="xxl" width="max-content">
          {articlesCount > ARTICLES_RANGE_FOR_PAGINATION && (
            <Pagination
              basePath={`${RESOURCE_CENTER_PATH}/topic/${topic}${tagNameSearchItem}`}
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

      <Footer />
    </>
  );
};

Topic.propTypes = {
  match: object,
  location: object,
};

export default Topic;
