import React from 'react';
import styled from 'styled-components';
import { oneOf, object } from 'prop-types';
import { ifProp } from 'styled-tools';

import { getTrustScoreType } from 'sly/web/services/helpers/community';
import { COLUMN_LAYOUT_IMAGE_WIDTH } from 'sly/web/constants/communityTile';
import { Block, Grid } from 'sly/common/components/atoms';
import { community as communityPropType } from 'sly/common/propTypes/community';
import IconItem from 'sly/web/components/molecules/IconItem';
import Link from 'sly/common/components/atoms/Link';


const Wrapper = styled(Grid)`
  ${ifProp({ layout: 'row' }, 'grid-template-columns: auto;')}
`;

const RotatedBlock = styled(Block)`
  // transform: rotate(45deg);
`;

const TrustScoreTile = ({ layout, community }) => {
  const { value, prop1, prop2, prop3, moreInfoText, licensingUrl } = getTrustScoreType(community, 'stateScore');
  return (
    <Block
      as="article"
      position="relative"
      background="primary.background"
    >
      <Wrapper
        layout={layout}
        borderRadius="small"
        border="regular"
        borderPalette="grey.stroke"
        gap="large"
        dimensions={[COLUMN_LAYOUT_IMAGE_WIDTH, 'auto']}
        // no column layout support below tablet
        upToTablet={{
          gridTemplateColumns: 'auto',
        }}
      >
        <RotatedBlock border="regular" size="title" background="primary.background" >{value}</RotatedBlock>
        <Block
          marginBottom="regular"
          padding="regular"
        >
          <IconItem
            icon="check"
            iconSize="body"
            size="body"
            pad="large"
          >
            {prop1}
          </IconItem>
          <IconItem
            icon="check"
            iconSize="body"
            size="body"
            pad="large"
          >
            {prop2}
          </IconItem>
          <IconItem
            icon="check"
            iconSize="body"
            size="body"
            pad="large"
            clamped
          >
            {prop3}
          </IconItem>
        </Block>
        <Block
          marginBottom="regular"
          padding="regular"
        >
          {moreInfoText}
        </Block>
        <Block
          marginBottom="regular"
          padding="regular"
        >
          <Link href={licensingUrl} to={licensingUrl}>Visit the state licensing authority for {community.name}</Link>
        </Block>
      </Wrapper>
    </Block>
  );
};

TrustScoreTile.propTypes = {
  community: communityPropType.isRequired,
  score: object,
  layout: oneOf(['column', 'row']),
};

TrustScoreTile.defaultProps = {
  layout: 'row',
};

export default TrustScoreTile;
