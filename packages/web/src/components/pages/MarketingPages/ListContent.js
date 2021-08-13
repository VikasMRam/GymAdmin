import React from 'react';
import { array } from 'prop-types';
import styled from 'styled-components';

import MarketingPageWrapper from './MarketingPageWrapper';
import MarketingPageTitle from './MarketingPageTitle';
import ArrowForward from 'sly/common/icons/ArrowForward';
import { Flex, Hr, Block, Link } from 'sly/common/system';
import { color, space } from 'sly/common/system/sx';

const ElementLink = styled(Block)`
  ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
    li {
      color: ${color('slate.base')};
      &:not(:last-child) {
        margin-bottom: ${space('l')};
      }
    }
  }
  p {
    color: ${color('slate.base')};
  }
  a {
    color: ${color('viridian.base')};
    text-decoration: none;
  }
`

const ListContent = ({
  infoBlockList,
}) => (
  <>
    {infoBlockList?.length > 0 && infoBlockList?.map(list => (
        <>
          <MarketingPageWrapper
            key={list.id}
          >
            <MarketingPageTitle title={list.Title} />
            <Flex
              flexDirection="column"
              sx$laptop={{
                width: 'col8',
              }}
            >
              {list?.RepeteableComponent?.map((item, index) => (
                  <Flex
                    flexDirection="column"
                    key={item.id}
                    color="slate.base"
                    mb={list?.RepeteableComponent.length - 1 !== index && 'xxl'}
                    sx$laptop={{
                      mb: `${list?.RepeteableComponent.length - 1 !== index && 'xxxl'}`,
                    }}
                  >
                    {item?.subTitle &&
                      <Block
                        font="title-m"
                        mb='l'
                      >
                        {item.subTitle}
                      </Block>}
                    {item.Text &&
                      <ElementLink
                        font="body-l"
                        dangerouslySetInnerHTML={{
                          __html: item.Text?.replace(/&nbsp;/g, ''),
                        }}
                      />}
                    {item.LinkTitle &&
                      <Link
                        to={item?.href}
                        font="title-s-azo"
                        mt="l"
                        textDecoration="none"
                      >
                        {item.LinkTitle}
                      <ArrowForward
                        verticalAlign="middle"
                        paddingLeft="xxs"
                      />
                    </Link>}
                  </Flex>
              ))}
            </Flex>
          </MarketingPageWrapper>
        <Hr />
      </>
      ))
    }
  </>
);

ListContent.propTypes = {
  contentBlock: array,
};

export default ListContent;
