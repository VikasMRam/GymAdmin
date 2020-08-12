import React from 'react';
import { arrayOf, string } from 'prop-types';

import Icon from '.';

import { getKey } from 'sly/common/components/themes';
import Block from 'sly/common/components/atoms/Block';

export function Icons({ icons, ...props }) {
  return (
    <Block display="flex" flexWrap="wrap">
      {icons.map(icon => (
        <Block
          background="grey"
          backgroundVariation="background"
          align="center"
          verticalAlign="middle"
          border="regular"
          borderPalette="grey"
          borderRadius="xLarge"
          margin="medium"
          padding="small"
          width={getKey('sizes.element.xHuge')}
          height={getKey('sizes.element.xHuge')}
          title={icon}
          key={icon}
        >
          <Icon
            icon={icon}
            size="title"
            background="white"
            borderRadius="large"
            border="regular"
            borderPalette="grey"
            {...props}
          />
          <Block marginTop="medium" align="center" size="caption" numberOfLines={1}>{icon}</Block>
        </Block>
      ))}
    </Block>
  );
}

Icons.propTypes = {
  icons: arrayOf(string),
};

Icons.defaultProps = {
  icons: [],
};
