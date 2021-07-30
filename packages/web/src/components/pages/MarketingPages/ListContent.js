import React from 'react';
import { array } from 'prop-types';
import styled from 'styled-components';

import ArrowForward from 'sly/common/icons/ArrowForward';
import { Flex, Hr, Block, Link } from 'sly/common/system';
import { color } from 'sly/common/system/sx';

const ElementLink = styled(Block)`
  p {
    a {
      color: ${color('viridian.base')};
      text-decoration: none;
    }
  }
`

const ListContent = ({
  contentBlock
}) => (
  <>
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
               paddingTop="xxl"
               paddingRight="xl"
            >
              {item.subTitle}
            </Block>
          </Block>
          <Flex
            flexDirection="column"
            body="body-l"
            paddingBottom="l"
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
