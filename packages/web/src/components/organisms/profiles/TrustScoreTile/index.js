import React from 'react';
import styled, { css } from 'styled-components';
import { oneOf, object, func } from 'prop-types';
import { ifProp, prop } from 'styled-tools';

import { getTrustScoreType } from 'sly/web/services/helpers/community';
import SlyEvent from 'sly/web/services/helpers/events';
import { COLUMN_LAYOUT_IMAGE_WIDTH } from 'sly/web/constants/communityTile';
import { community as communityPropType } from 'sly/common/propTypes/community';
import { assetPath } from 'sly/web/components/themes';
import { Block, Grid, Image, Link, IconWithTextWrapper } from 'sly/common/system';
import { Plus, Minus, Help } from 'sly/common/icons';


const Wrapper = styled(Grid)`
  ${ifProp({ layout: 'row' }, 'grid-template-columns: auto;')}
`;

const RotatedBlock = styled(Block)`
  ${ifProp('rotate', css`transform: rotate(${prop('rotate')});`)}
`;

const TrustScoreTile = ({ layout, community, externalClickEvt }) => {
  const { value, valueText, prop1, prop2, prop3, moreInfoText, licensingUrl } = getTrustScoreType(community, 'stateScore');
  let imagePath = 'images/profiles/excellent-score.png';
  let Icon = Plus;
  if (value > 70 && value < 81) {
    imagePath = 'images/profiles/good-score.png';
  } else if (value > 50 && value < 71) {
    imagePath = 'images/profiles/okay-score.png';
    Icon = Help;
  } else if (value < 51) {
    imagePath = 'images/profiles/poor-score.png';
    Icon = Minus;
  }
  return (
    <Block
      as="article"
      position="relative"
    >
      <Wrapper
        flow={layout}
        gridTemplateColumns="auto"
        sx$tablet={{
          gridTemplateColumns: `${COLUMN_LAYOUT_IMAGE_WIDTH} auto`,
        }}
      >
        <RotatedBlock position="relative" alignItems="center" display="flex" flexDirection="column" justifyContent="center" >
          <Image src={assetPath(imagePath)} />
          <Block  position="absolute">
            <Block textAlign="center" font="title-xxl">{value}</Block>
            <Block textAlign="center">{valueText}</Block>
          </Block>
        </RotatedBlock>


        <Block
          marginTop="m"
          marginBottom="m"
          padding="xs"
          textAl
        >
          <IconWithTextWrapper>
            <Plus />
            {prop1}
          </IconWithTextWrapper>
          <IconWithTextWrapper >
            <Icon />
            {prop2}
          </IconWithTextWrapper>
          <IconWithTextWrapper >
            <Icon />
            {prop3}
          </IconWithTextWrapper>
        </Block>

      </Wrapper>
      <Block
        marginBottom="xs"
        font="title-s"
      >
        What is Seniorly Trust Score?
      </Block>
      <Block>
        {moreInfoText}
        <Link
          href={licensingUrl}
          target="_blank"
          textDecoration="underline"
          onClick={externalClickEvt}
        >
          cdss.ca.gov
        </Link>
      </Block>
    </Block>
  );
};

TrustScoreTile.propTypes = {
  community: communityPropType.isRequired,
  score: object,
  layout: oneOf(['column', 'row']),
  externalClickEvt: func,
};

TrustScoreTile.defaultProps = {
  layout: 'column',
};

export default TrustScoreTile;
