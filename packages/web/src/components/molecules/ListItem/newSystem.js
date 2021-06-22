import React from 'react';
import PropTypes, { node } from 'prop-types';

import { Block } from 'sly/common/system';
import { Star } from 'sly/common/icons';


const ListItem = ({
  children, Icon,
}) => (
  <Block display="flex" pad="xs">
    <Block pr="xs" >
      <Icon />
    </Block>
    {children}
  </Block>
);

ListItem.propTypes = {
  children: PropTypes.node,
  Icon: node.isRequired,

};

ListItem.defaultProps = {
  Icon: Star,
};

export default ListItem;
