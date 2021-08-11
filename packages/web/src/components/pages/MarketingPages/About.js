import { array } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { Flex, Block, Link, Grid, Image, Paragraph } from 'sly/common/system';
import ListContent from './ListContent';
import ArrowForward from 'sly/common/icons/ArrowForward';

const ImageWrapper = styled(Image)`
  width: 100%;
  height: 9.5rem;
  border-radius: 50%;
`;

const About = ({
  contentBlock,
  getTeamContent,
}) => {
  const getTeamList = _.map(_.flatMap(getTeamContent, 'imgWithTitle'));

  return (
    <>
      <ListContent contentBlock={contentBlock} />
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
          {getTeamContent?.[0]?.heading}
        </Block>
        <Flex
          width="100%"
          flexDirection="column"
          alignItems="center"
          sx$laptop={{  width: 'col6', alignItems: 'baseline'}}
        >
          <Grid
            gridTemplateColumns="9rem 9rem"
            alignItems="stretch"
            gridGap="m"
            flow="row"
            sx$tablet={{ gridTemplateColumns: "col2 col2 col2 col2" }}
          >
          {getTeamList?.length > 0 && getTeamList?.map (item => {
            const src = item?.srcImg?.url;
            return (
              <>
                <Flex
                  flexDirection="column"
                  textAlign="center"
                  justifyContent="space-between"
                >
                  {src ? (
                  <ImageWrapper
                    src={src}
                  />) : (
                  <Block
                    background="slate.lighter-90"
                    borderRadius="50%"
                    height="9.5rem"
                  />)
                  }
                  <Paragraph
                    paddingTop="l"
                    font="title-xs-azo"
                  >
                    {item.title}
                  </Paragraph>
                  <Paragraph
                    font="body-xs"
                    color="slate.lighter-40"
                  >{item.subTitle}</Paragraph>
                </Flex>
              </>
            )
          })}
          </Grid>
          <Paragraph width="auto">{getTeamContent?.[0]?.decription}</Paragraph>
          <Link
            paddingTop="l"
            to={getTeamContent?.[0]?.to}
            alignSelf="start"
          >
                {getTeamContent?.[0]?.textLink}
                <ArrowForward paddingLeft="xxs" />
          </Link>
        </Flex>
      </Flex>
    </>
  )
};

About.propTypes = {
  getTeamContent: array,
  contentBlock: array,
}

export default About;
