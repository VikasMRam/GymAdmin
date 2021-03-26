import React from 'react';
import { object } from 'prop-types';
import styled, { css } from 'styled-components';

import Block from 'sly/common/components/atoms/Block';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import { startingWith, withBorder } from 'sly/common/components/helpers';
import { getKey, size } from 'sly/common/components/themes';
import { getStylesForEllipsisText } from 'sly/web/components/resourceCenter/helper';

const WrapperWithBorder = styled(Block)(withBorder);

const BioWrapper = styled(Block)(
  false,
  css(getStylesForEllipsisText(6)),
);

const TitleAndLocation = styled(Block)(
  false,
  css`
    text-align: center;
    
    ${startingWith('tablet', css({ textAlign: 'left' }))}
  `,
);

const AdvisorPreview = ({ info }) => {
  const { profileImageUrl, bio, citiesServed, displayName } = info || {};

  return (
    <WrapperWithBorder
      border="regular"
      borderRadius="small"
      borderPalette="slate"
      borderVariation="lighter-90"
      height="100%"
      paddingY="l"
      paddingX="m"
      startingWithTablet={{ display: 'flex', padding: 'l', marginBottom: 0 }}
    >
      <WrapperWithBorder
        borderRadius="50%"
        overflow="hidden"
        height={size('element.xHuge')}
        width={size('element.xHuge')}
        marginX="auto"
        upToTablet={{ marginBottom: 'm' }}
        startingWithTablet={{
          height: size('element.xxxLarge'),
          width: size('element.xxxLarge'),
          marginLeft: 0,
          marginRight: 'l',
          marginBottom: 0,
        }}
      >
        <ResponsiveImage
          css={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
          src={profileImageUrl}
        />
      </WrapperWithBorder>
      <Block
        startingWithTablet={{
          width: `calc(100% - ${getKey('sizes.element.xxxLarge')} - ${getKey('sizes.spacing.l')})`,
        }}
      >
        <TitleAndLocation marginBottom="m" font="body-large" palette="slate.base">
          {`${displayName} - ${citiesServed?.[0]}`}
        </TitleAndLocation>
        <BioWrapper font="body-regular" palette="slate.base">
          {bio}
        </BioWrapper>
      </Block>
    </WrapperWithBorder>
  );
};


AdvisorPreview.propTypes = {
  info: object,
};

export default AdvisorPreview;
