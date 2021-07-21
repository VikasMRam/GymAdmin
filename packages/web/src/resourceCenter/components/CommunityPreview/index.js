import React from 'react';
import { number, object, string } from 'prop-types';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

import Block from 'sly/common/system/Block';
import Image from 'sly/common/system/Image';
import CommunityInfo from 'sly/web/components/molecules/CommunityInfo';

const CommunityPreview = ({
  starting_rate: startingRate,
  background_image: url,
  prop_stats: propRatings,
  info,
  care,
  ...rest
}) => {
  const { capacity, typeCare } = info || {};

  return (
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
          color="viridian.base"
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
  );
};

CommunityPreview.propTypes = {
  starting_rate: number,
  background_image: string,
  care: string,
  info: object,
  prop_stats: object,
};

export default CommunityPreview;
