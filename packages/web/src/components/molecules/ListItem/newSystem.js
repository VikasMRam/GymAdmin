import React from 'react';
import PropTypes, { node } from 'prop-types';

import { Block } from 'sly/common/system';
import { Star } from 'sly/common/icons';


const ListItem = ({
  children, icon,
}) => (
  <Block display="flex" pad="xs">
    <Block pr="xs" >
      {icon}
    </Block>
    {children}
  </Block>
);

ListItem.propTypes = {
  children: PropTypes.node,
  icon: node.isRequired,

};

ListItem.defaultProps = {
  icon: Star,
};

export default ListItem;
