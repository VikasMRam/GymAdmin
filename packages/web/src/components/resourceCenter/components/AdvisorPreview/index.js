import React from 'react';
import { object } from 'prop-types';

import Block from 'sly/common/system/Block';
import Image from 'sly/common/system/Image';
import { getKey, size } from 'sly/common/components/themes';
import { getStylesForEllipsisText } from 'sly/web/components/resourceCenter/helper';

const AdvisorPreview = ({ info }) => {
  const { profileImageUrl, bio, citiesServed, displayName } = info || {};

  return (
    <Block
      border="box"
      height="100%"
      padding="l m"
      sx$tablet={{ display: 'flex', padding: 'l', marginBottom: 0 }}
    >
      <Block
        borderRadius="50%"
        overflow="hidden"
        height={size('element.xHuge')}
        width={size('element.xHuge')}
        marginX="auto"
        marginBottom="m"
        sx$tablet={{
          height: size('element.xxxLarge'),
          width: size('element.xxxLarge'),
          marginLeft: 0,
          marginRight: 'l',
          marginBottom: 0,
        }}
      >
        <Image
          css={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
          src={profileImageUrl}
        />
      </Block>
      <Block
        color="slate.base"
        sx$tablet={{
          width: `calc(100% - ${getKey('sizes.element.xxxLarge')} - ${getKey('sizes.spacing.l')})`,
        }}
      >
        <Block
          marginBottom="m"
          font="title-s"
          textAlign="center"
          sx$tablet={{
            textAlign: 'left',
          }}
        >
          {`${displayName} - ${citiesServed?.[0]}`}
        </Block>
        <Block font="body-m" color="slate.base" sx={getStylesForEllipsisText(6)}>
          {bio}
        </Block>
      </Block>
    </Block>
  );
};


AdvisorPreview.propTypes = {
  info: object,
};

export default AdvisorPreview;
