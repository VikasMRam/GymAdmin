import React from 'react';
import { node, string } from 'prop-types';

import { Block } from 'sly/web/components/atoms';

const TipBox = ({
  heading, children, ...props
}) => (
  <Block {...props}>
    <Block pad="large" weight="bold" size="tiny" palette="primary" variation="base">{heading}</Block>
    {children}
  </Block>
);

TipBox.propTypes = {
  heading: string.isRequired,
  children: node,
};

TipBox.defaultProps = {
  palette: 'grey',
  background: 'white',
};

export default TipBox;
