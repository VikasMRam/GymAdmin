import React from 'react';
import { string, bool } from 'prop-types';

import { Badge, Icon, Block } from 'sly/common/components/atoms';

const PlusBadge = ({ plusCategory, fullWidth }) => (
  <Badge
    fullWidth={fullWidth}
    direction="row"
    alignItems="center"
    background="primary"
    borderRadius="small"
    padding={['small', 'regular']}
    width={fullWidth ? '100%' : 'auto'}
    justifyContent={fullWidth ? 'left' : 'center'}
    css={fullWidth ? {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    } : null}
  >
    <Icon icon="logo" palette="white" size="body" marginRight="small" />
    <Block
      palette="white"
      size="body"
      marginRight="small"
      css={{
        fontStyle: 'italic',
      }}
    >
      plus
    </Block>
    {plusCategory &&
    <Block palette="white">
      |
    </Block>
    }
    {plusCategory &&
      <Block
        palette="white"
        size="body"
        marginLeft="small"
        css={{
          textTransform: 'uppercase',
        }}
      >
        {plusCategory}
      </Block>
    }

  </Badge>
);

PlusBadge.propTypes = {
  plusCategory: string,
  fullWidth: bool,
};

export default PlusBadge;
