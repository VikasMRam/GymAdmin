import React from 'react';
import styled from 'styled-components';
import { oneOf, object, func } from 'prop-types';
import { ifProp } from 'styled-tools';

import { COLUMN_LAYOUT_IMAGE_WIDTH } from 'sly/web/constants/communityTile';
import { Block, Grid, Link } from 'sly/common/components/atoms';
import { Tag } from 'sly/web/components/atoms';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import { getKey, size } from 'sly/common/components/themes';


const Wrapper = styled(Grid)`
  ${ifProp({ layout: 'row' }, 'grid-template-columns: auto;')}
`;

const MarketplaceResourceContentTile = ({ layout, marketplaceResource, onClick }) => {
  const { title, description, ctaUrl, imageUrl, info: { tags = ['Article'] } } = marketplaceResource;
  const mediaSizes = getKey('imageFormats.searchResults').sizes;
  // const imgHeight = layout === 'column' ? 172 : 216;
  // eslint-disable-next-line react/no-array-index-key
  const dTags = tags.map((t, i) => <Tag key={`tag-${i}`} outline marginRight="regular" palette="green">{t}</Tag>);
  return (
    <Block
      as="article"
      position="relative"
      maxWidth="358px"
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
        css={{
        gridTemplateRows: 'min-content 1fr',
        gridTemplateColumns: 'auto!important',
        padding: '0',
        height: 'inherit',
        }}
      >
        <ResponsiveImage
          src={imageUrl}
          // height={imgHeight}
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
        <Block padding="large" css={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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