import React from 'react';
import { array } from 'prop-types';
import styled from 'styled-components';

import ArrowForward from 'sly/common/icons/ArrowForward';
import { Flex, Hr, Block, Link } from 'sly/common/system';
import { color } from 'sly/common/system/sx';

const ElementLink = styled(Block)`
  p {
    color: ${color('slate.base')};
    a {
      color: ${color('viridian.base')};
      text-decoration: none;
    }
  }
`

const ListContent = ({
  contentBlock,
  infoBlockList,
}) => (
  <>
  {
    infoBlockList?.length > 0 && infoBlockList?.map(list => (
      <>
        <Flex
          key={list.id}
          margin="xxl m"
          justifyContent="center"
          alignItems="baseline"
          flexDirection="column"
          sx$tablet={{
            margin: 'xxxl l',
          }}
          sx$laptop={{
            flexDirection: 'row',
            margin: 'xxxl 0',
          }}
        >
          <Block
            font="title-l"
            mb="xxl"
            sx$laptop={{  width: 'col4' }}
          >
            {list.Title}
          </Block>
          <Flex
            flexDirection="column"
            sx$laptop={{
              width: 'col8',
              ml: 'l',
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
                  }}                >
                  <Block
                    font="title-m"
                    mb='l'
                  >
                    {item.subTitle}
                  </Block>
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
        </Flex>
      <Hr />
    </>
    ))
  }
  {/* TODO: Need to be removed after all pages will be update */}
  {contentBlock?.length > 0 && contentBlock?.map(item => (
      <>
        <Flex
          margin="l m"
          justifyContent="center"
          alignItems="baseline"
          flexDirection="column"
          sx$laptop={{ flexDirection: 'row',  margin: 'xxxl m' }}
        >
          <Block
            sx$laptop={{  width: 'col4' }}
            font="title-l"
            paddingBottom="l"
          >
            {item.Title}
            <Block
               font="title-m"
              //  paddingTop="xxl"
               paddingRight="xl"
            >
              {item.subTitle}
            </Block>
          </Block>
          <Flex
            flexDirection="column"
            body="body-l"
            // paddingBottom="l"
            sx$laptop={{  width: 'col6' }}
          >
            {item.Description}
            {item.LinkText &&
            <Link paddingTop="l" to={item.to}>
              {item.LinkText}
              <ArrowForward paddingLeft="xxs" />
            </Link>}
            {item.infoBlock &&
            <ElementLink
              font="body-l"
              pad={['xxl', 'xxxl']}
              dangerouslySetInnerHTML={{
                __html: item.infoBlock,
              }}
            />}
          </Flex>
        </Flex>
        <Hr />
      </>
    ))}
  </>
);

ListContent.propTypes = {
  contentBlock: array,
};

export default ListContent;
