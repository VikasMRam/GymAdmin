import React, { Fragment, useMemo, createRef } from 'react';
import styled, { css } from 'styled-components';
import { array, node, number } from 'prop-types';

import { generateSearchUrl } from 'sly/web/services/helpers/url';
import { host } from 'sly/web/config';
import { RESOURCE_CENTER_PATH } from 'sly/web/dashboard/dashboardAppPaths';
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
import TableOfContents from 'sly/web/resourceCenter/components/ArticleTableOfContents';
import CommunityPreview from 'sly/web/resourceCenter/components/CommunityPreview';
import AdvisorPreview from 'sly/web/resourceCenter/components/AdvisorPreview';
import LinksBlock from 'sly/web/resourceCenter/components/ArticleLinksBlock';

import EditorValueWrapper from './EditorValueWrapper';
import FAQItem from './FAQItem';
import Search from './Search';

const DZComponentsNames = {
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
  linksBlock: 'links-block',
  video: 'video',
  youTubeVideoLink: 'you-tube-video-link',
};

const StyledLink = styled(Link)`
  cursor: pointer;

  &:hover {
    box-shadow: 0 ${space('xxs')} ${space('m')} 0 rgba(0, 0, 0, 0.1);
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

const CommunityAndAdvisorsWrapper = ({ children, itemCount, key, ...rest }) => (
  <Grid
    key={key}
    sx={{
      width: '100%',
      overflow: 'auto',
      gridTemplateColumns: `repeat(${itemCount}, 18rem) 1px`,
      gridColumnGap: 'm',
      paddingY: 'xs',
      paddingX: 'm',
      marginBottom: 'l',
    }}
    sx$tablet={{
      overflow: 'visible',
      width: 'col8',
      marginBottom: 'xxl',
      paddingBottom: 0,
      paddingX: 0,
      gridTemplateColumns: '100%',
      gridTemplateRows: 'auto',
      gridRowGap: 'm',
    }}
    {...rest}
  >
    {children}
    <Block sx$tablet={{ display: 'none' }} />
  </Grid>
);

CommunityAndAdvisorsWrapper.propTypes = {
  children: node,
  itemCount: number,
  key: number,
};

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

const isSubtitle = ({ __component }) => __component?.includes(DZComponentsNames.subtitle);

const CMSDynamicZone = ({ content: data }) => {
  const content = useMemo(() => {
    return data.map((item) => {
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
          const componentName = __component.split('.')[1];
          if (componentName === DZComponentsNames.search) {
            return (
              <Search
                key={`search${index}`}
                onCurrentLocation={onCurrentLocation}
                title={rest.title}
                toc={rest.toc?.replace(/_/g, '-')}
              />
            )
          }
          if (componentName === DZComponentsNames.editor) return <EditorValueWrapper key={index} value={rest.value}/>;
          if (componentName === DZComponentsNames.subtitle) {
            return (
              <Heading
                key={index}
                font="title-l"
                ref={rest.ref}
                css={subtitleStyles}
                id={rest.subtitleId}
              >
                {rest.value}
              </Heading>
            );
          }
          if (componentName === DZComponentsNames.listInTwoColumns) return (
            <ListInTwoColumnsWrapper
              key={index}
              dangerouslySetInnerHTML={{ __html: rest.listInTwoColumnsValue }}
              width={sx`calc(100% - ${space('m')} * 2)`}
              sx$tablet={{ width: 'col6', pad: 'xs' }}
              sx$laptop={{ width: 'col8' }}
            />
          );
          if (componentName === DZComponentsNames.quote) return (
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
               color="slate.lighter-40"
               font="body-m"
               marginBottom="xl"
               width={sx`calc(100% - ${space('m')} * 2)`}
               sx$tablet={{ width: 'col4', marginBottom: 'xxl' }}
               dangerouslySetInnerHTML={{ __html: rest.title }}
             />
           </Fragment>
          );
          if (componentName === DZComponentsNames.faq)
            return <FAQItem
              key={index}
              title={rest.title}
              description={rest.description}
              withMarginBottom={!content[index + 1]?.__component.includes(DZComponentsNames.faq)}
              withMarginTop={!content[index - 1]?.__component.includes(DZComponentsNames.faq)}
            />;
          if (componentName === DZComponentsNames.link) {
            const isResourceCenterRoute = rest.to.includes(`${host}${RESOURCE_CENTER_PATH}`);
            const splitPath = rest.to.split(host);
            return (
              <Flex
                key={index}
                alignItems="center"
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
                  <Link
                    {...{ [isResourceCenterRoute ? 'to' : 'href']: isResourceCenterRoute ? splitPath[splitPath.length - 1] : rest.to}}
                  >
                    {rest.title}
                  </Link>
                </Block>
              </Flex>
            );
          }
          if (componentName === DZComponentsNames.image) {
            const isFullSizeImage = rest.size === 'large';
            const tabletWidth = (rest.size === 'middle' && 680) || (rest.size === 'small' && 504);
            const laptopWidth = (rest.size === 'middle' && 1032) || (rest.size === 'small' && 680);

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
                    css={{ width: '100%' }}
                    alt={rest.image?.alternativeText}
                    path={rest.image?.path}
                    sizes={
                      isFullSizeImage
                        ? '100vw'
                        : `(max-width: 727px) 100vw, (max-width: 1079px) ${tabletWidth}px, ${laptopWidth}px`
                    }
                    sources={
                      isFullSizeImage
                        ? [320, 425, 728, 1080, 1200]
                        : [288, 393, tabletWidth, laptopWidth]
                    }
                    {...(!isFullSizeImage && { aspectRatio: '3:2' })}
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
          if (componentName === DZComponentsNames.listWithIcons) {
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
                      width="100%"
                      sx$tablet={{ width: '100%' }}
                    />
                  </Grid>
                ))}
              </Block>
            )
          }
          if (componentName === DZComponentsNames.community) {
            return (
              <CommunityAndAdvisorsWrapper
                key={index}
                itemCount={rest.communities.length}
                gridTemplateRows="21.75rem"
              >
                {rest.communities?.map((item) => (
                  <StyledLink key={item.slug} to={item.url}>
                    <CommunityPreview {...{ ...item}} />
                  </StyledLink>
                ))}
              </CommunityAndAdvisorsWrapper>
            );
          }
          if (componentName === DZComponentsNames.advisors) {
            return (
              <CommunityAndAdvisorsWrapper
                key={index}
                itemCount={rest.advisors.length}
                gridTemplateRows="25rem"
              >
                {rest.advisors?.map((item, index) => (
                  <StyledLink key={item.slug} to={item.info.url}>
                    <AdvisorPreview {...{ ...item, index: index + 1 }} />
                  </StyledLink>
                ))}
              </CommunityAndAdvisorsWrapper>
            );
          }
          if (componentName === DZComponentsNames.linksBlock) {
            return (
              <Block
                key={index}
                marginBottom="l"
                marginX="m"
                width={sx`calc(100% - ${space('m')} * 2)`}
                sx$tablet={{ marginBottom: 'xl', marginX: 'auto', width: 'col6' }}
                sx$laptop={{ width: 'col8' }}
              >
                <LinksBlock
                  title={rest.title}
                  description={rest.description}
                  links={rest.link}
                />
              </Block>
            )
          }
          if (componentName === DZComponentsNames.video) {
            return (
              <Block
                as="video"
                title={rest.title}
                sx={{
                  height: '315px',
                  width: sx`calc(100% - (${space('m')} * 2))`,
                  mx: 'auto',
                  mb: 'l',
                }}
                sx$tablet={{ width: 'col6', mb: 'xl' }}
                sx$laptop={{ width: 'col8' }}
                controls
                controlsList="nodownload"
                src={rest.video.url}
              />
            );
          }
          if (componentName === DZComponentsNames.youTubeVideoLink) {
            return (
              <Block
                as="iframe"
                title={rest.title}
                src={`${rest.src}`}
                frameBorder="0"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sx={{
                  width: sx`calc(100% - (${space('m')} * 2))`,
                  height: '315px',
                  mx: 'auto',
                  mb: 'l',
                }}
                sx$tablet={{ width: 'col6', mb: 'xl' }}
                sx$laptop={{ width: 'col8' }}
              />
            );
          }
          return '';
        })}
      </Flex>
    </>
  );
};

CMSDynamicZone.propTypes = {
  content: array,
};

export default CMSDynamicZone;
