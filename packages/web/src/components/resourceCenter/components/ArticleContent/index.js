import React, { Fragment, useMemo, createRef } from 'react';
import styled, { css } from 'styled-components';
import { array } from 'prop-types';

import { generateSearchUrl } from 'sly/web/services/helpers/url';
import { host } from 'sly/web/config';
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import { getKey } from 'sly/common/components/themes';
import Heading from 'sly/common/system/Heading';
import redirectTo from 'sly/common/services/redirectTo/redirectTo';

import { sx$tablet, sx$laptop, sx, space } from 'sly/common/system/sx';
import Block from 'sly/common/system/Block';
import Flex from 'sly/common/system/Flex';
import Grid from 'sly/common/system/Grid';
import Span from 'sly/common/system/Span';
import Offer from 'sly/common/icons/Offer';

import Link from 'sly/common/system/Link';
import Icon from 'sly/common/components/atoms/Icon';
import Image from 'sly/common/system/Image';
import TableOfContents from 'sly/web/components/resourceCenter/components/ArticleTableOfContents';
import CommunityPreview from 'sly/web/components/resourceCenter/components/CommunityPreview';
import AdvisorPreview from 'sly/web/components/resourceCenter/components/AdvisorPreview';

import EditorValueWrapper from './EditorValueWrapper';
import FAQItem from './FAQItem';
import Search from './Search';

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
  listWithIcons: 'list-with-icons',
  advisors: 'advisors',
};

const CommunityAndAdvisorsWrapper = styled(Link)`
  & {
    position: relative;

    &:hover::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      box-shadow: 0 ${space('xxs')} ${space('m')} 0 rgba(0, 0, 0, 0.1);
    }
  }
`;

const QuoteTitle = styled(Block)`
  text-align: center;
`;

const QuoteDescription = styled(Block)`
  text-align: center;
  font-weight: normal;
  &:before {
    content: "“";
  }
  &:after {
    content: "”";
  }
`;

const ListInTwoColumnsWrapper = styled(Block)`
  & * {
    line-height: ${space('xl')};
  }

  & ul,
  & ol {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-inline-start: ${space('l')};
    margin: ${space('xs')} 0 calc(${space('xs')} + ${space('s')});

    ${sx$tablet({ marginTop: 0 })}

    & li {
      margin-bottom: ${space('s')};
      width: 100%;
      ${sx$tablet({ width: sx`calc(50% - ${space('l')})` })}
    }
  }
`;

const subtitleStyles = css`
  margin-bottom: ${space('l')};
  width: calc(100% - ${space('m')} * 2);
  ${sx$tablet({ width: 'col6', marginBottom: 'xl' })}
  ${sx$laptop({ width: 'col8' })}
`;

const onCurrentLocation = (addresses) => {
  if (addresses?.length) {
    const path = `${generateSearchUrl(['Nursing Homes'], addresses[0])}`;

    redirectTo(path);
  }
};

const isSubtitle = ({ __component }) => __component?.includes(articleDZComponentsNames.subtitle);

const ArticleContent = ({ content: data }) => {
  const content = useMemo(() => {
    return data.map(item => {
      if (isSubtitle(item)) {
        return { ref: createRef(), ...item };
      }
      return item;
    });
  }, [data]);

  return (
    <>
      {!!content?.filter(item => isSubtitle(item)).length && (
        <TableOfContents
          subtitlesData={content.filter(item => isSubtitle(item))}
        />
      )}
      <Flex
        alignItems="center"
        flexWrap="wrap"
        flexDirection="column"
        width="100%"
      >
        {content?.map(({ __component, ...rest }, index) => {
          if (__component.includes(articleDZComponentsNames.search)) return <Search key={`search${index}`} onCurrentLocation={onCurrentLocation} />
          if (__component.includes(articleDZComponentsNames.editor)) return <EditorValueWrapper key={index} value={rest.value}/>;
          if (__component.includes(articleDZComponentsNames.subtitle)) {
            return <Heading key={index} font="title-l" ref={rest.ref} css={subtitleStyles}>{rest.value}</Heading>;
          }
          if (__component.includes(articleDZComponentsNames.listInTwoColumns)) return (
            <ListInTwoColumnsWrapper
              key={index}
              dangerouslySetInnerHTML={{ __html: rest.listInTwoColumnsValue }}
              width={sx`calc(100% - ${space('m')} * 2)`}
              sx$tablet={{ width: 'col6' }}
              sx$laptop={{ width: 'col8' }}
            />
          );
          if (__component.includes(articleDZComponentsNames.quote)) return (
           <Fragment key={index}>
             <QuoteDescription
               as="blockquote"
               font="quote"
               marginBottom="l"
               width={sx`calc(100% - ${space('m')} * 2)`}
               sx$tablet={{ width: 'col8', letterSpacing: '0.44px', marginTop: 's' }}
               sx$laptop={{ width: 'col10' }}
               dangerouslySetInnerHTML={{ __html: rest.description }}
             />
             <QuoteTitle
               color="slate.lighter-60"
               font="body-m"
               marginBottom="xl"
               width={`calc(100% - ${space('m')} * 2)`}
               sx$tablet={{ width: 'col4', marginBottom: 'xxl' }}
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
            const splitPath = rest.to.split(host);
            return (
              <Flex
                key={index}
                width={sx`calc(100% - ${space('m')} * 2)`}
                padding="l"
                font="body-m"
                background="viridian.lighter-90"
                borderRadius="xxs"
                display="flex"
                marginBottom="l"
                sx$tablet={{ width: 'col6', marginBottom: 'xl' }}
                sx$laptop={{ width: 'col8' }}
              >
                <Block>
                  <Offer size="l" color="viridian.base" />
                </Block>
                <Block marginLeft="m">
                  <Span>{rest.description}: </Span>
                  <Link {...{ [isResourceCenterRoute ? 'to' : 'href']: isResourceCenterRoute ? splitPath[splitPath.length - 1] : rest.to}}>
                    {rest.title}
                  </Link>
                </Block>
              </Flex>
            );
          }
          if (__component.includes(articleDZComponentsNames.image)) {
            const isFullSizeImage = rest.size === 'large';
            const tabletWidth = theme.layout[`col${(rest.size === 'middle' && 8) || (rest.size === 'small' && 6)}`];
            const laptopWidth = theme.layout[`col${(rest.size === 'middle' && 12) || (rest.size === 'small' && 8)}`];

            return (
              <Fragment key={index}>
                <Block
                  marginBottom={rest.image?.alternativeText ? 'xs' : 'xl'}
                  marginTop="xs"
                  width={(isFullSizeImage && '100%') || ((rest.size === 'small' || (rest.size === 'middle')) && sx`calc(100% - ${space('m')} * 2)`)}
                  sx$tablet={{
                    width: (rest.size === 'middle' && 'col8') || (rest.size === 'small' && 'col6'),
                    marginBottom: rest.image?.alternativeText ? 'm' : 'xxl',
                    marginTop: 'm',
                  }}
                  sx$laptop={{
                    width: (rest.size === 'small' && 'col8') || (rest.size === 'middle' && 'col12'),
                  }}
                >
                  <Image
                    alt={rest.image?.alternativeText}
                    aspectRatio="3:2"
                    {...(!isFullSizeImage ? {
                      path: rest.image?.path,
                      sources: [
                        288,
                        393,
                        parseFloat(tabletWidth) * 16,
                        parseFloat(laptopWidth) * 16,
                      ],
                      sizes: `(max-width: ${parseFloat(theme.breakpoint.tablet) - 1}px) 100vw, (max-width: ${parseFloat(theme.breakpoint.laptop) - 1}px) ${tabletWidth}, ${laptopWidth}`,
                    } : { src: rest.image?.url })}
                  />
                </Block>
                {rest.image?.alternativeText && (
                  <Block
                    font="body-s"
                    marginBottom="xl"
                    textAlign="center"
                    width={sx`calc(100% - ${space('m')} * 2)`}
                    sx$tablet={{ marginBottom: 'xxl', width: 'col6' }}
                    sx$laptop={{ width: 'col8' }}
                  >
                    {rest.image?.alternativeText}
                  </Block>
                )}
              </Fragment>
            )
          }
          if (__component.includes(articleDZComponentsNames.listWithIcons)) {
            return (
              <Block
                key={index}
                paddingTop="xs"
                width={sx`calc(100% - ${space('m')} * 2)`}
                sx$tablet={{ width: 'col6' }}
                sx$laptop={{ width: 'col8' }}
              >
                {rest.value?.map(({ icon, value }, index) => (
                  <Grid
                    key={`${value}-${index}`}
                    gridTemplateColumns={sx`${space('l')} calc(100% - ${space('l')} - ${space('l')})`}
                    gridColumnGap="m"
                    marginBottom="xs"
                    sx$tablet={{ marginBottom: '0' }}
                  >
                    <Icon icon={icon.replace(/_/g, '-')} css={{ paddingTop: space('xxs') }} />
                    <EditorValueWrapper
                      value={value}
                      sx$tablet={{ width: '100%' }}
                    />
                  </Grid>
                ))}
              </Block>
            )
          }
          if (__component.includes(articleDZComponentsNames.community)) {
            return (
              <Grid
                key={index}
                width="100%"
                padding="sx m xl m"
                sx={{
                  overflow: 'auto',
                  gridTemplateColumns: `repeat(${rest.communities.length}, 18rem) 1px`,
                  gridColumnGap: 'm',
                  paddingTop: 'm',
                  marginBottom: 'xxl',
                  '@tablet': {
                    width: 'col8',
                    overflow: 'hidden',
                    paddingLeft: 0,
                    paddingRight: 0,
                    gridTemplateColumns: '100%',
                    gridTemplateRows: `repeat(${rest.communities.length}, 10.75rem)`,
                    gridRowGap: 'm',
                  }
                }}
              >
                {rest.communities?.map((item, index) => console.log('item', item) || (
                  <CommunityAndAdvisorsWrapper key={item.slug} to={item.url}>
                    <CommunityPreview {...{ ...item, index: index + 1 }} />
                  </CommunityAndAdvisorsWrapper>
                ))}
                <Block sx$tablet={{ display: 'none' }} />
              </Grid>
            )
          }
          if (__component.includes(articleDZComponentsNames.advisors)) {
            return (
              <Grid
                key={index}
                sx={{
                  overflow: 'auto',
                  width: '100%',
                  paddingX: 'm',
                  gridTemplateColumns: `repeat(${rest.advisors.length}, 18rem) 1px`,
                  gridTemplateRows: '25rem',
                  gridColumnGap: 'm',
                  paddingTop: 'm',
                  marginBottom: 'xxl',
                }}
                sx$tablet={{
                  overflow: 'hidden',
                  width: 'col8',
                  paddingLeft: 0,
                  paddingRight: 0,
                  gridTemplateColumns: '100%',
                  gridTemplateRows: 'auto',
                  gridRowGap: 'm',
                }}
              >
                {rest.advisors?.map((item, index) => (
                  <CommunityAndAdvisorsWrapper key={item.slug}>
                    <AdvisorPreview
                      onClick={e => e.preventDefault()}// TODO: after adding attribute 'to' remove handler
                      {...{ ...item, index: index + 1 }}
                    />
                  </CommunityAndAdvisorsWrapper>
                ))}
                <Block sx$tablet={{ display: 'none' }} />
              </Grid>
            )
          }
          return '';
        })}
      </Flex>
    </>
  );
};

ArticleContent.propTypes = {
  content: array,
};

export default ArticleContent;
