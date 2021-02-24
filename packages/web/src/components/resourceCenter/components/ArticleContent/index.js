import React, { createRef, useRef, useEffect, useState, useMemo, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { array } from 'prop-types';

import { getKey, size } from 'sly/common/components/themes';
import { withBorder, startingWith, withDisplay, upTo } from 'sly/common/components/helpers';
import { generateSearchUrl } from 'sly/web/services/helpers/url';
import { host } from "sly/web/config";
import { RESOURCE_CENTER_PATH } from "sly/web/constants/dashboardAppPaths";
import Heading from 'sly/common/components/atoms/Heading';
import Block from 'sly/common/components/atoms/Block';
import redirectTo from 'sly/common/services/redirectTo/redirectTo';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';
import Link from "sly/common/components/atoms/Link";
import Icon from "sly/common/components/atoms/Icon";
import ResponsiveImage from "sly/web/components/atoms/ResponsiveImage";
import FAQItem from "sly/web/components/resourceCenter/components/FAQItem";
import EditorValueWrapper from "sly/web/components/resourceCenter/components/EditorValueWrapper";
import TableOfContents from 'sly/web/components/resourceCenter/components/ArticleTableOfContents';

const articleDZComponentsNames = {
  subtitle: 'subtitle',
  search: 'search',
  listInTwoColumns: 'list-in-2-columns',
  quote: 'quote',
  image: 'image',
  editor: 'editor',
  community: 'community',
  faq: 'faq',
  link: 'link',
};

const ContentWrapper = styled(Block)(withDisplay);

const SearchCommunityWrapper = styled(Block)(withBorder);

const LinkBlockText = styled(Block)(withDisplay);

const LinkBlockWrapper = styled(Block)(withBorder, withDisplay);

const QuoteTitle = styled(Block)(
  css`
    text-align: center;
  `,
);

const AlternativeText = styled(Block)(
  css`
    text-align: center;
  `,
);

const QuoteDescription = styled(Block)(
  css`
    text-align: center;
    font-weight: normal;
    &:before {
      content: "“";
    }
    &:after {
      content: "”";
    }
  `,
);

const ListInTwoColumnsWrapper = styled(Block)(
  css`
    & * {
      font-size: ${size('font.')};
      line-height: ${size('spacing.xl')};
    }
    
    & ul,
    & ol {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-inline-start: ${size('spacing.l')};
      margin: ${getKey('sizes.spacing.xs')} 0 calc(${getKey('sizes.spacing.xs')} + ${getKey('sizes.spacing.s')});
    
      ${startingWith('tablet', css({ marginTop: 0 }))}
      
      & li {
        margin-bottom: ${size('spacing.s')};
        width: calc(50% - ${getKey('sizes.spacing.l')});
        ${upTo('tablet', css({ width: '100%' }))}
      }
    }
 `,
);

const subtitleStyles = css`
  margin-bottom: ${size('spacing.l')};
  width: calc(100% - ${getKey('sizes.spacing.m')} * 2);
  ${startingWith('tablet', css({ width: size('layout.col6'), marginBottom: size('spacing.xl') }))}
  ${startingWith('laptop', css({ width: size('layout.col8') }))}
`;

const onCurrentLocation = (addresses) => {
  if (addresses?.length) {
    const path = `${generateSearchUrl(['Nursing Homes'], addresses[0])}`;

    redirectTo(path);
  }
};

const ArticleContent = ({ content }) => {
  const subtitlesData = useMemo(() => {
    const subtitlesArr = content?.filter(item => item.subtitle).map(({ subtitle }) => {
      const ref = createRef();
      return { ref, subtitle };
    });
    if (subtitlesArr?.length) return subtitlesArr;
    return [];
  }, [content]);

  return (
    <>
      {!!content?.filter(({ subtitle }) => subtitle).length &&
        <TableOfContents
          subtitlesData={subtitlesData}
          initialSubtitles={content?.filter(({ subtitle }) => subtitle)}
        />
      }
      <ContentWrapper
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        flexDirection="column"
      >
        {content?.map(({ __component, ...rest }, index) => {
          if (__component.includes(articleDZComponentsNames.search)) {
            return (
              <SearchCommunityWrapper
                key={index}
                borderRadius="small"
                paddingY="l"
                paddingX="l"
                marginBottom="l"
                background="viridian.lighter-90"
                width={`calc(100% - ${getKey('sizes.spacing.m')} * 2)`}
                startingWithTablet={{ paddingY: 'xl', paddingX: 'xl', width: size('layout.col6'), marginBottom: 'xl' }}
                startingWithLaptop={{ width: size('layout.col8'), margin: `${getKey('sizes.spacing.m')} 0 ${getKey('sizes.spacing.xxl')}` }}
              >
                <Block
                  font="title-large"
                  marginBottom="s"
                  startingWithLaptop={{ marginBottom: 'l' }}
                >
                  Find assisted living communities near you
                </Block>
                <SearchBoxContainer
                  onCurrentLocation={onCurrentLocation}
                  layout="header"
                  width="100%"
                  height={size('element.large')}
                  padding={['regular', 0]}
                  visibility="visible"
                  include="community"
                  placeholder="Search by city, zip, community name"
                />
              </SearchCommunityWrapper>
            );
            }
          if (__component.includes(articleDZComponentsNames.editor)) return <EditorValueWrapper key={index} value={rest.value}/>;
          if (__component.includes(articleDZComponentsNames.subtitle)) {
            const item = subtitlesData.find(item => item?.subtitle === rest.value);
            return <Heading key={index} font="title-large" ref={item?.ref} css={subtitleStyles}>{rest.value}</Heading>;
          }
          if (__component.includes(articleDZComponentsNames.listInTwoColumns)) return (
            <ListInTwoColumnsWrapper
              key={index}
              dangerouslySetInnerHTML={{ __html: rest.listInTwoColumnsValue }}
              width={`calc(100% - ${getKey('sizes.spacing.m')} * 2)`}
              startingWithTablet={{ width: getKey('sizes.layout.col6') }}
              startingWithLaptop={{ width: getKey('sizes.layout.col8') }}
            />
          );
          if (__component.includes(articleDZComponentsNames.quote)) return (
           <Fragment key={index}>
             <QuoteDescription
               as="blockquote"
               font="title-large"
               marginBottom="l"
               width={`calc(100% - ${getKey('sizes.spacing.m')} * 2)`}
               startingWithTablet={{ width: size('layout.col8'), letterSpacing: '0.44px', marginTop: "s" }}
               startingWithLaptop={{ width: size('layout.col10') }}
               dangerouslySetInnerHTML={{ __html: rest.description }}
             />
             <QuoteTitle
               palette="grey"
               font="body-regular"
               marginBottom="xl"
               width={`calc(100% - ${getKey('sizes.spacing.m')} * 2)`}
               startingWithTablet={{ width: size('layout.col4'), marginBottom: 'xxl' }}
               dangerouslySetInnerHTML={{ __html: rest.title }}
             />
           </Fragment>
          );
          if (__component.includes(articleDZComponentsNames.faq))
            return <FAQItem
              key={index}
              title={rest.title}
              description={rest.description}
              withMarginBottom={!content[index + 1]?.__component.includes(articleDZComponentsNames.faq)}
              withMarginTop={!content[index - 1]?.__component.includes(articleDZComponentsNames.faq)}
            />;
          if (__component.includes(articleDZComponentsNames.link)) {
            const isResourceCenterRoute = rest.to.includes(`${host}${RESOURCE_CENTER_PATH}`);
            return (
              <LinkBlockWrapper
                width={`calc(100% - ${getKey('sizes.spacing.m')} * 2)`}
                padding="l"
                background="viridian.lighter-90"
                borderRadius="small"
                display="flex"
                marginBottom="l"
                startingWithTablet={{ width: size('layout.col6'), marginBottom: 'xl' }}
                startingWithLaptop={{ width: size('layout.col8') }}
              >
                <Block>
                  <Icon icon="loyalty" palette="viridian.base" fontSize={14} />
                </Block>
                <Block marginLeft="m">
                  <LinkBlockText font="body-regular" display="inline" paddin>{rest.description}: </LinkBlockText>
                  <Link
                    font="body-regular"
                    {...{ [isResourceCenterRoute ? 'to' : 'href']: isResourceCenterRoute ? rest.to.replace(host, '') : rest.to}}
                  >
                    {rest.title}
                  </Link>
                </Block>

              </LinkBlockWrapper>
            );
          }
          if (__component.includes(articleDZComponentsNames.image)) {
            return (
              <>
                <Block
                  marginBottom={rest.image?.alternativeText ? 'xs' : 'xl'}
                  marginTop="xs"
                  width={(rest.size === 'large' && '100%') || ((rest.size === 'small' || (rest.size === 'middle')) && `calc(100% - ${getKey('sizes.spacing.m')} * 2)`)}
                  startingWithTablet={{
                    width: size(`layout.${(rest.size === 'middle' && 'col8') || (rest.size === 'small' && 'col6')}`),
                    marginBottom: rest.image?.alternativeText ? 'm' : 'xxl',
                    marginTop: 'm',
                  }}
                  startingWithLaptop={{
                    width: size(`layout.${(rest.size === 'small' && 'col8') || (rest.size === 'middle' && 'col12')}`),
                  }}
                >
                  <ResponsiveImage
                    css={{ width: '100%', height: 'auto' }}
                    src={rest.image?.url}
                    alt={rest.image?.alternativeText}
                  />
                </Block>
                {rest.image?.alternativeText && (
                  <AlternativeText
                    marginBottom="xl"
                    width={`calc(100% - ${getKey('sizes.spacing.m')} * 2)`}
                    startingWithTablet={{ marginBottom: 'xxl', width: size('layout.col6') }}
                    startingWithLaptop={{ width: size('layout.col8') }}
                    font="body-small"
                  >
                    {rest.image?.alternativeText}
                  </AlternativeText>
                )}
              </>
            )
          }

          return '';
        })}
      </ContentWrapper>
    </>
  );
};

ArticleContent.propTypes = {
  content: array,
};

export default ArticleContent;
