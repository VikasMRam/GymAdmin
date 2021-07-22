import React from 'react';
import styled from 'styled-components';
import { array } from 'prop-types';
import _ from 'lodash';

import { assetPath } from 'sly/web/components/themes';
import FaqBox from 'sly/web/components/pages/MarketingPages/FaqBox';
import { Flex, color, Hr, Block, Paragraph, Image, Heading, } from 'sly/common/system';


const ImageWrapper = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 20px 20px 0 0 ${props => color(props.boxShadowColor)};
`;

const iconArr = ['vectors/home/advisor.svg', 'vectors/home/smart-search.svg', 'vectors/home/freedom-to-explore.svg', ]

const HowItWorks = ({
  imgWithItem,
  getListWithIcons,
  getFaqList,
}) => {
  const listWithImg = imgWithItem && _.map(_.flatMap(imgWithItem, 'imgWithTitle'));

  return (
    <>
      {listWithImg?.length && (
        <Block
          width="100%"
          margin="xxl auto"
          padding='0 l'
          sx$tablet={{ width: 'col8' }}
          sx$laptop={{ width: 'col12' }}
        >
          {listWithImg?.map((item, index) => (
              <Flex
                key={item.id}
                width="100%"
                flexDirection='column'
                sx$tablet={{
                  flexDirection: `${index & 1 ? 'row' : 'row-reverse'}`,
                }}
              >
                <Block
                  width="100%"
                  height="col3"
                  marginBottom="xl"
                  padding="0"
                  sx$tablet={{ width: 'col4', height: 'col4', padding: 'l' }}
                  sx$laptop={{ width: 'col6', height: 'col6' }}
                >
                  <ImageWrapper
                    boxShadowColor={item?.backgroundColor}
                    src={item?.srcImg?.url}
                    alt="smarter-way"
                  />
                </Block>
                <Flex
                  marginBottom="xl"
                  flexDirection="column"
                  justifyContent="center"
                  sx$tablet={{ width: 'col4', padding: '0 l' }}
                  sx$laptop={{ width: 'col6', padding: '0 l' }}
                >
                  <Heading paddingBottom="m">
                    {item.title}
                  </Heading>
                  <Paragraph font="body-l">
                    {item.description}
                  </Paragraph>
                </Flex>
              </Flex>
            )
          )}
        </Block>
      )}
      <Hr />
      {getListWithIcons?.length && (
        <Block
          width="100%"
          margin="xxl auto"
          padding='0 l'
          sx$tablet={{ width: 'col8' }}
          sx$laptop={{ width: 'col12' }}
        >
          <Heading>
            3 colums in prop
          </Heading>
            <Flex
              flexDirection="column"
              sx$tablet={{ flexDirection: 'row' }}
            >
            {getListWithIcons?.map((item, index) => (
                  <Flex
                    key={item.id}
                    width="100%"
                    padding="xxl 0"
                    sx$tablet={{
                      width: 'col4',
                      flexDirection: 'column',
                      alignItems: 'baseline',
                      marginRight: `${getListWithIcons.length - 1 !== index && 'l'}`
                    }}
                  >
                    <Block textAlign="center" paddingRight="l">
                      <Image src={assetPath(iconArr[index])} />
                    </Block>
                    <Block
                      font="body-l"
                      dangerouslySetInnerHTML={{
                        __html: item.value,
                      }}
                    />
                  </Flex>
              )
            )
          }
          </Flex>
        </Block>
      )}
      <Hr />
      {getFaqList?.length && (
        <Block
        width="100%"
        margin="xxl auto"
        padding='0 l'
        sx$tablet={{ width: 'col8' }}
        sx$laptop={{ width: 'col12' }}
      >
        <FaqBox faqs={getFaqList}/>
      </Block>
      )}
    </>
  )};

  HowItWorks.propTypes = {
    imgWithItem: array,
    getListWithIcons: array,
    getFaqList: array,
  };

export default HowItWorks;
