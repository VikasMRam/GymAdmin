import React from 'react';
import { number, object, string } from 'prop-types';
import styled from 'styled-components';
import { isString } from 'lodash';

import Block from 'sly/common/components/atoms/Block';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import CommunityInfo from 'sly/web/components/molecules/CommunityInfo';
import { withBorder } from 'sly/common/components/helpers';

const Wrapper = styled(Block)(withBorder);
const CommunityPreview = ({
  index,
  starting_rate: startingRate,
  background_image: url,
  prop_stats: propRatings,
  info,
  care,
  ...rest
}) => {
  const { capacity, typeCare } = info || {};

  return (
    <Wrapper
      border="regular"
      borderRadius="small"
      borderPalette="slate"
      borderVariation="lighter-90"
      overflow="hidden"
      startingWithTablet={{ display: 'flex', marginBottom: 0 }}
    >
      <Block height="12rem" startingWithTablet={{ height: '100%', width: '16.125rem' }}>
        <ResponsiveImage
          css={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
          src={url}
        />
      </Block>
      <Block padding="m" startingWithTablet={{ flexGrow: 1 }}>
        <CommunityInfo
          palette="viridian.base"
          index={index}
          community={{
            ...rest,
            capacity: capacity || '',
            startingRate,
            propRatings,
            care: (isString(care) && JSON.parse(`[${care?.replace(/^(.)|(.)$/g, '')}]`)) || typeCare || [],
          }}
        />
      </Block>
    </Wrapper>
  );
};

CommunityPreview.propTypes = {
  index: number,
  id: string,
  starting_rate: number,
  background_image: string,
  care: string,
  info: object,
  prop_stats: object,
};

export default CommunityPreview;
