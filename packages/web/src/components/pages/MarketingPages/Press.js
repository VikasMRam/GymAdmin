import React from 'react';
import { array } from 'prop-types';

import ListContent from './ListContent';
import ArticlePreview from 'sly/web/resourceCenter/components/ArticlePreview';
import ArrowForward from 'sly/common/icons/ArrowForward';
import Logo from 'sly/common/icons/Logo';
import { Flex, Hr, Block, Link, Paragraph } from 'sly/common/system';

import { withHydration } from 'sly/web/services/partialHydration';

const CarouselContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCarouselContainer" */ 'sly/web/containers/CarouselContainer'));

const brandAssetsContent = [
  {
    title: 'seniorly',
    color: 'viridian.base',
    description: 'Logo color',
    background: '',
  },
  {
    title: 'seniorly',
    color: 'white',
    description: 'Logo white',
    background: 'slate.lighter-80',
  },
  {
    title: '',
    color: 'viridian.base',
    description: 'Logo color',
    background: '',
  },
  {
    title: '',
    color: 'white',
    description: 'Logo white',
    background: 'slate.lighter-80',
  },
]

const Press = ({
  contentBlock,
  contentResentBlockPost,
  getArticlesArr,
}) => (
  <>
    <ListContent contentBlock={contentBlock} />
    {!!getArticlesArr?.length && (
      <Flex
        margin="l m"
        justifyContent="center"
        alignItems="start"
        flexDirection="column"
        sx$laptop={{ flexDirection: 'row',  margin: 'xxxl m' }}
      >
         <Block
            sx$laptop={{  width: 'col4' }}
            font="title-l"
            paddingBottom="l"
          >
            {contentResentBlockPost?.[0]?.titleBlock}
          </Block>
          <Block
            width="100%"
            sx$laptop={{  width: 'col8' }}
          >
            <CarouselContainer itemsQty={getArticlesArr.length}>
              {getArticlesArr?.map(item => {
                const normalizeTagList = item.tagsSlug.split(' ').filter(Boolean).map(item => ({
                  value: item,
                  id: Math.floor(Math.random() * 100) + Date.now(),
                }));

                return (
                <ArticlePreview
                  key={item.title}
                  alternativeText={item.title}
                  tagsList={item.tagsList || normalizeTagList}
                  {...item}
                  customStyles={{ width: '100%', lineHeight: 'body-m' }}
                />
              )})}
            </CarouselContainer>
            <Link paddingTop="l" to={contentResentBlockPost?.[0]?.to}>
              {contentResentBlockPost?.[0]?.linkForBlock}
              <ArrowForward paddingLeft="xxs" />
            </Link>
          </Block>
      </Flex>
    )}
    <Hr />
    <Flex
      margin="l m"
      justifyContent="center"
      alignItems="start"
      flexDirection="column"
      sx$laptop={{ flexDirection: 'row',  margin: 'xxxl m' }}
    >
      <Block
        sx$laptop={{  width: 'col4' }}
        font="title-l"
        paddingBottom="l"
      >
        Brand asstes
      </Block>
      <Flex
        flexDirection="column"
        width="100%"
        sx$tablet={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}
        sx$laptop={{  width: 'col8' }}
      >
        {brandAssetsContent?.map(item => (
          <Flex
            flexDirection="column"
            sx$tablet={{ width: '49%', paddingBottom: 'xxl' }}>
            <Flex
              border="box"
              padding="2.625rem xxl"
              background={item?.background}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Logo
                color={item?.color}
                size="xxxl"
              />
               <Paragraph
                font="title-xxl"
                color={item?.color}
                padding="0"
              >
                {item?.title}
              </Paragraph>
            </Flex>
            <Paragraph
              color="slate.base"
              font="body-m"
            >{item.description}</Paragraph>
          </Flex>
        ))}
      </Flex>
    </Flex>
  </>
);

Press.propTypes = {
  contentBlock: array,
  contentResentBlockPost: array,
  getArticlesArr: array,
}

export default Press;
