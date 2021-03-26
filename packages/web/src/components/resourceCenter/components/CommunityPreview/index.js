import React from 'react';
import { number, object, string } from 'prop-types';
import styled from 'styled-components';
import { isString, isArray } from 'lodash';

import { size } from 'sly/common/components/themes';
import { withBorder } from 'sly/common/components/helpers';
import Block from 'sly/common/components/atoms/Block';
import Link from 'sly/common/components/atoms/Link';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import CommunityInfo from 'sly/web/components/molecules/CommunityInfo';

const Wrapper = styled(Block)(withBorder);

const StyledLink = styled(Link)`
  & {
    position: relative;

    &:hover::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      box-shadow: 0 ${size('spacing.xxs')} ${size('spacing.m')} 0 rgba(0, 0, 0, 0.1);
    }
  }
`;

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
    <StyledLink to={rest.url}>
      <Wrapper
        border="regular"
        borderRadius="small"
        borderPalette="slate"
        borderVariation="lighter-90"
        overflow="hidden"
        height="100%"
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
              // TODO: Should check if strapi does not change field type text[] to text, if not this
              // <(isString(care) && JSON.parse(`[${care?.replace(/^(.)|(.)$/g, '')}]`)) || (isArray(care) && care)>
              // can be replaced to <care>
              care:
                (isString(care) && JSON.parse(`[${care?.replace(/^(.)|(.)$/g, '')}]`))
                || (isArray(care) && care)
                || typeCare
                || [],
            }}
          />
        </Block>
      </Wrapper>
    </StyledLink>
  );
};

CommunityPreview.propTypes = {
  index: number,
  starting_rate: number,
  background_image: string,
  care: string,
  info: object,
  prop_stats: object,
};

export default CommunityPreview;
