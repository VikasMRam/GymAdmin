import React from 'react';
import styled, { css } from 'styled-components';
import { oneOf, object, func } from 'prop-types';
import { ifProp, prop } from 'styled-tools';

import { COLUMN_LAYOUT_IMAGE_WIDTH } from 'sly/web/constants/communityTile';
import { Block, Grid, Button } from 'sly/common/components/atoms';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import { assetPath } from 'sly/web/components/themes';
import { getKey, size } from 'sly/common/components/themes';


const Wrapper = styled(Grid)`
  ${ifProp({ layout: 'row' }, 'grid-template-columns: auto;')}
`;

const MarketplaceResourceOfferTile = ({ layout, marketplaceResource, onClick }) => {
  const { title, description, ctaUrl, imageUrl, tag = 'Article' } = marketplaceResource;
  const mediaSizes = getKey('imageFormats.searchResults').sizes;
  const imgHeight = layout === 'column' ? 172 : 216;
  return (
    <Block
      as="article"
      position="relative"
      height="100%"
    >
      <Wrapper
        flow={layout}
        borderRadius="small"
        border="regular"
        borderPalette="slate.stroke"
        marginBottom="large"
        dimensions={[COLUMN_LAYOUT_IMAGE_WIDTH, 'auto']}
        // no column layout support below tablet
        upToTablet={{
          gridTemplateRows: 'min-content 1fr',
          gridTemplateColumns: 'auto!important',
          padding: '0',
          height: 'inherit',
        }}
      >

        <ResponsiveImage
          // src="https://d354o3y6yz93dt.cloudfront.net/images/320x214/68c0281350470f07313c8cd38c5ed0ca/BED1_DSC_0270_sm.webp"
          src={imageUrl}
          aspectRatio="3:2"
          layout={layout}
          sizes={mediaSizes}
          startingWithTablet={{ height: 'inherit !important' }}
          upToTablet={{
              borderRadius: size('spacing.small'),
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              margin: 0,
            }}
        />
        <Block
          padding="large"
          upToTablet={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          startingWithLaptop={{ display: 'grid', gridTemplateColumns: '70% 30%', justifyItems: 'center', alignItems: 'center' }}
        >
          <div>
            <Block
              marginBottom="regular"
              size="subtitle"
              weight="medium"
            >
              {title}
            </Block>
            <Block marginBottom="regular"> {description}</Block>
          </div>
          <Button startingWithLaptop={{ height: 'fit-content' }} uptoTablet={{ width: '100%' }} onClick={onClick} palette="white" to={ctaUrl} >Learn more</Button>
        </Block>
      </Wrapper>
    </Block>
  );
};

MarketplaceResourceOfferTile.propTypes = {
  marketplaceResource: object.isRequired,
  onClick: func,
  layout: oneOf(['column', 'row']),
};

MarketplaceResourceOfferTile.defaultProps = {
  layout: 'column',
};

export default MarketplaceResourceOfferTile;
