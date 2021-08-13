import React from 'react';
import { array } from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

import ListContent from './ListContent';
import MarketingPageWrapper from './MarketingPageWrapper';
import MarketingPageTitle from './MarketingPageTitle';
import ArticlePreview from 'sly/web/resourceCenter/components/ArticlePreview';
import ArrowForward from 'sly/common/icons/ArrowForward';
import { Flex, Hr, Block, Link, Paragraph, Image } from 'sly/common/system';
import { space } from 'sly/common/system/sx';

import { withHydration } from 'sly/web/services/partialHydration';

const CarouselContainer = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkCarouselContainer" */ 'sly/web/containers/CarouselContainer'));

const ImageWrapper = styled(Image)`
  width: 100%;
  height: 100%;
`;
const FlexGap = styled(Flex)`
  gap: ${space('l')};
`;

const Press = ({
  contentBlock,
  contentResentBlockPost,
  getArticlesArr,
  infoBlockList,
  getListWithImg,
}) => {
  const brandAssetsList = getListWithImg && _.map(_.flatMap(getListWithImg, 'imgWithTitle'))
    return (
    <>
      <ListContent infoBlockList={infoBlockList} contentBlock={contentBlock} />
      {!!getArticlesArr?.length && (
        <MarketingPageWrapper>
          <MarketingPageTitle title={contentResentBlockPost?.[0]?.titleBlock}/>
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
              <Link
                mt="l"
                to={contentResentBlockPost?.[0]?.to}
                font="title-s-azo"
              >
                {contentResentBlockPost?.[0]?.linkForBlock}
                <ArrowForward
                  verticalAlign="middle"
                  paddingLeft="xxs"
                />
              </Link>
            </Block>
        </MarketingPageWrapper>
      )}
      <Hr />
      {!!getListWithImg?.length && (
        <MarketingPageWrapper>
           <MarketingPageTitle title={getListWithImg?.[0]?.heading} />
           <FlexGap
            flexWrap="wrap"
            justifyContent="center"
            width="100%"
            sx$tablet={{
              justifyContent: 'space-between',
            }}
            sx$laptop={{  width: 'col8' }}
           >
            {brandAssetsList?.map(item => (
            <Block
              flexBasis="20.5rem"
              sx$tablet={{
                flexBasis: '48%',
              }}
            >
              <Block
                key={item.id}
                border="box"
                height="13.667rem"
                background={item?.backgroundColor}
                padding="2.625rem xxl 2.584rem"
                mb="0.521rem"
              >
                <ImageWrapper
                  src={item?.srcImg?.url}
                  alt="smarter-way"
                />
              </Block>
                <Paragraph
                  color="slate.base"
                  font="body-l"
                  mb="l"
                >
                  {item.title}
                </Paragraph>
            </Block>
            ))}
           </FlexGap>
        </MarketingPageWrapper>
      )}
      <Hr />
    </>
  );
};

Press.propTypes = {
  contentBlock: array,
  contentResentBlockPost: array,
  getArticlesArr: array,
}

export default Press;
