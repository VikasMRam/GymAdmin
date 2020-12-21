import React from 'react';
import styled, { css } from 'styled-components';
import { oneOf, object, func } from 'prop-types';
import { ifProp, prop } from 'styled-tools';

import { getTrustScoreType } from 'sly/web/services/helpers/community';
import { COLUMN_LAYOUT_IMAGE_WIDTH } from 'sly/web/constants/communityTile';
import { Block, Grid, Button, Link } from 'sly/common/components/atoms';
import { Tag } from 'sly/web/components/atoms';
// import Tag from 'sly/web/components/atoms';
import { community as communityPropType } from 'sly/common/propTypes/community';
import IconItem from 'sly/web/components/molecules/IconItem';
import { assetPath } from 'sly/web/components/themes';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import { getKey, getSize, size } from 'sly/common/components/themes';


const Wrapper = styled(Grid)`
  ${ifProp({ layout: 'row' }, 'grid-template-columns: auto;')}
`;

const MarketplaceResourceContentTile = ({ layout, marketplaceResource, onClick }) => {
  const { title, description, ctaUrl, imageUrl, info: { tags = ['Article'] } } = marketplaceResource;
  const mediaSizes = getKey('imageFormats.searchResults').sizes;
  const imgHeight = layout === 'column' ? 172 : 216;
  const dTags = tags.map(t => <Tag outline marginRight="regular" palette="green">{t}</Tag>);
  // FIXME: Add use size constant;
  const width  =  window.innerWidth > 768 ? '358px' : 'inherit';
  return (
    <Block
      as="article"
      position="relative"
      maxWidth="358px"
      width={width}
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
            height={imgHeight}
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
        <Block padding="large">
          <Block
            marginBottom="regular"
            size="subtitle"
            weight="medium"
          >
            <Link onClick={onClick} to={ctaUrl}>{title}</Link>
          </Block>
          <Block marginBottom="regular"> {description}</Block>
          {dTags.length > 0 && <Block palette="primary">{dTags}</Block> }
        </Block>
      </Wrapper>
    </Block>
  );
};

MarketplaceResourceContentTile.propTypes = {
  marketplaceResource: object.isRequired,
  onClick: func,
  layout: oneOf(['column', 'row']),
};

MarketplaceResourceContentTile.defaultProps = {
  layout: 'row',
};

export default MarketplaceResourceContentTile;
