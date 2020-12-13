import React from 'react';
import styled, { css } from 'styled-components';
import { oneOf, object } from 'prop-types';
import { ifProp, prop } from 'styled-tools';

import { getTrustScoreType } from 'sly/web/services/helpers/community';
import { COLUMN_LAYOUT_IMAGE_WIDTH } from 'sly/web/constants/communityTile';
import { Block, Grid, Button } from 'sly/common/components/atoms';
import { community as communityPropType } from 'sly/common/propTypes/community';
import IconItem from 'sly/web/components/molecules/IconItem';
import Link from 'sly/common/components/atoms/Link';
import { assetPath } from 'sly/web/components/themes';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import { getKey, size } from 'sly/common/components/themes';


const Wrapper = styled(Grid)`
  ${ifProp({ layout: 'row' }, 'grid-template-columns: auto;')}
`;

const MarketplaceResourceTile = ({ layout, marketplaceResource }) => {
  const { title, description, ctaUrl, imageUrl } = marketplaceResource;
  const mediaSizes = getKey('imageFormats.searchResults').sizes;
  return (
    <Block
      as="article"
      position="relative"
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
          gridTemplateColumns: 'auto!important',
          padding: '0',
        }}
      >
        <Block>
          <ResponsiveImage
            src={imageUrl}
            aspectRatio="3:2"
            layout={layout}
            sizes={mediaSizes}
            upToTablet={{
              borderRadius: size('spacing.small'),
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              margin: 0,
            }}
          />
        </Block>
        <Block padding="large" clamped>
          <Block
            marginBottom="regular"
            size="subtitle"
            weight="medium"
          >
            {title}
          </Block>
          <Block marginBottom="regular"> {description}</Block>
          <Block><Button to={ctaUrl} >Learn more </Button></Block>
        </Block>
      </Wrapper>
    </Block>
  );
};

MarketplaceResourceTile.propTypes = {
  marketplaceResource: object.isRequired,
  score: object,
  layout: oneOf(['column', 'row']),
};

MarketplaceResourceTile.defaultProps = {
  layout: 'column',
};

export default MarketplaceResourceTile;
