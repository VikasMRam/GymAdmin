import React from 'react';
import styled, { css } from 'styled-components';
import { oneOf, object } from 'prop-types';
import { ifProp, prop } from 'styled-tools';

import { getTrustScoreType } from 'sly/web/services/helpers/community';
import { COLUMN_LAYOUT_IMAGE_WIDTH } from 'sly/web/constants/communityTile';
import { Block, Grid } from 'sly/common/components/atoms';
import { community as communityPropType } from 'sly/common/propTypes/community';
import IconItem from 'sly/web/components/molecules/IconItem';
import Link from 'sly/common/components/atoms/Link';
import { assetPath } from 'sly/web/components/themes';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';


const Wrapper = styled(Grid)`
  ${ifProp({ layout: 'row' }, 'grid-template-columns: auto;')}
`;

const RotatedBlock = styled(Block)`
  ${ifProp('rotate', css`transform: rotate(${prop('rotate')});`)}
`;

const TrustScoreTile = ({ layout, community }) => {
  const { value, valueText, prop1, prop2, prop3, moreInfoText, licensingUrl } = getTrustScoreType(community, 'stateScore');
  let imagePath = 'images/profiles/moderate-score.png';
  if (value > 75) {
    imagePath = 'images/profiles/good-score.png';
  } else if (value > 50) {
    imagePath = 'images/profiles/moderate-score.png';
  }
  return (
    <Block
      as="article"
      position="relative"
    >
      <Wrapper
        flow={layout}
        borderRadius="small"
        border="large"
        borderPalette="grey.stroke"
        padding="large"
        marginBottom="large"
        dimensions={[COLUMN_LAYOUT_IMAGE_WIDTH, 'auto']}
        // no column layout support below tablet
        upToTablet={{
          gridTemplateColumns: 'auto',
        }}
      >
        <RotatedBlock position="relative" alignItems="center" display="flex" direction="column" justifyContent="center" >
          <ResponsiveImage src={assetPath(imagePath)} />
          <Block  position="absolute">
            <Block textAlign="center" size="superHero">{value}</Block>
            <Block textAlign="center">{valueText}</Block>
          </Block>
        </RotatedBlock>

        <div>
          <Block
            marginTop="large"
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
            >
              {prop3}
            </IconItem>
          </Block>
        </div>
      </Wrapper>
      <Block
        marginBottom="regular"
        size="regular"
        weight="medium"
      >
        What is Seniorly Trust Score?
      </Block>
      <Block
        marginBottom="regular"
      >
        {moreInfoText}
      </Block>
      <Block
        marginBottom="regular"
      >
        <Link href={licensingUrl} to={licensingUrl}>Visit the state licensing authority for {community.name}</Link>
      </Block>
    </Block>
  );
};

TrustScoreTile.propTypes = {
  community: communityPropType.isRequired,
  score: object,
  layout: oneOf(['column', 'row']),
};

TrustScoreTile.defaultProps = {
  layout: 'column',
};

export default TrustScoreTile;
