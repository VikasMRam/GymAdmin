import React from 'react';
import { string } from 'prop-types';

import Favorite from 'sly/common/icons/Favorite';
import { Block, Flex, space, sx } from 'sly/common/system';

const Callout = ({ title, description, className }) => (
  <Flex
    className={className}
    sx={{
      justifyContent: 'space-between',
      background: 'yellow.lighter-80',
      p: 'm',
      border: 'box',
      borderColor: 'yellow.lighter-80',
      mt: 's',
    }}
    sx$tablet={{ justifyContent: 'unset' }}
  >
    <Favorite
      active
      sx={{
        ml: 'xs',
        color: 'yellow.base',
        minWidth: sx`${space('l')}`,
      }}
      sx$tablet={{ ml: '0', mr: 'm' }}
    />
    <Block order="-1" sx$tablet={{ order: 1 }}>
      {title && <Block font="title-xs-azo" mb="xxs">{title}</Block>}
      {description && <Block font="body-m">{description}</Block>}
    </Block>
  </Flex>
);

Callout.propTypes = {
  title: string,
  description: string,
  className: string,
};

export default Callout;
