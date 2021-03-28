import React from 'react';
import { number, object, string } from 'prop-types';
import styled from 'styled-components';
import { isString, isArray } from 'lodash';

import { space } from 'sly/common/system/sx';
import Block from 'sly/common/system/Block';
import Link from 'sly/common/system/Link';
import Image from 'sly/common/system/Image';
import CommunityInfo from 'sly/web/components/molecules/CommunityInfo';

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
      box-shadow: 0 ${space('xxs')} ${space('m')} 0 rgba(0, 0, 0, 0.1);
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
      <Block
        border="box"
        overflow="hidden"
        height="100%"
        sx$tablet={{ display: 'flex', marginBottom: 0 }}
      >
        <Block height="12rem" sx$tablet={{ height: '100%', width: '16.125rem' }}>
          <Image
            css={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
            src={url}
          />
        </Block>
        <Block padding="m" sx$tablet={{ flexGrow: 1 }}>
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
      </Block>
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
