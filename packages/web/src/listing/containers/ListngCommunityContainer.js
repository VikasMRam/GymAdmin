import React from 'react';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';
import { space, sx$tablet, sx$laptop, Block, font, Button, Grid, Image, Link } from 'sly/common/system';


const StyledHeadingBoxSection = styled(HeadingBoxSection).attrs({ hasNoHr: true })`
  margin-bottom:  ${space('s')};
  ${ifProp('hasNoBottomHr', sx$tablet({
    marginBottom: 'm',
    paddingBottom: 'm',
    paddingTop: '0',
  }), sx$tablet({
    marginBottom: '0',
    paddingBottom: '0',
    paddingTop: '0',
  }))}

  ${sx$laptop({
    paddingX: '0',
  })}
  font:${font('body-l')};
`;

const StyledArticle = styled.article`
  margin-bottom: ${space('l')};
  &:last-of-type {
    margin-bottom: 0;
    p {
      margin-bottom: ${space('xs')};
    }
  }
`;

const getImagesOfCommunity = (community) => {
  const { images } = community.gallery || [];
  const filteredImages = images.filter(image => image.category === 'Exterior');
  return filteredImages.slice(0, 3);
};


const ListingCommunityContainer = ({ communitySection, community, ...props }) => {
  const Images = getImagesOfCommunity(community);

  return (
    <StyledHeadingBoxSection  heading="The community" mb="xs" {...props} >
      <StyledArticle>
        <Block dangerouslySetInnerHTML={{ __html: communitySection.content }} />
      </StyledArticle>
      <Block position="relative">
        <Grid
          gridTemplateColumns="1fr 1fr"
          gridGap="m"
          sx$laptop={{
               gridTemplateColumns: 'repeat(2, 1fr)',
             }}

          sx$tablet={{
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
        >
          <>
            {
          Images.map(((image) => {
            return (
              <Block height="100%" width="100%">
                <Image
                  path={image.path}
                  alt={image.name}
                  sx$tablet={{
               }}
                  sx$laptop={{
                    width: '100%',
               }}
                  key={image.name}
                  aspectRatio="3:2"
                  sizes="(max-width: 727px) 50vw, (max-width: 1079px) 334px, 250px"
                  sources={[
                138,
                186,
                250,
                334,
              ]}
                  loading="lazy"
                  border="round"
                />
              </Block>

            );
          }))
        }
          </>
        </Grid>
      </Block>
    </StyledHeadingBoxSection>

  );
};

export default ListingCommunityContainer;
