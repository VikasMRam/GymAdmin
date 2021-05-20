import React, { Children, cloneElement, isValidElement } from 'react';
import { oneOf, node, arrayOf, oneOfType, string, number } from 'prop-types';

import { getThemePropType } from 'sly/common/components/themes';
import Block from 'sly/common/components/atoms/Block';

const generateItemDimensions = (children, dimensions = []) => {
  // equally divide if no dimensions given
  if (children.length && !dimensions.length) {
    const ew = (100 / children.length).toFixed(2);
    dimensions = Array(children.length).fill(`${ew}%`);
  }

  return dimensions;
};

const Grid = ({ flow, children, gap, dimensions, ...props }) => {
  if (flow === 'row') {
    const wrappedChildren = Children.map(children,
      (child, idx) => isValidElement(child) ? cloneElement(child, {
        marginBottom: idx < children.length - 1 ? gap : 0,
      }) : child);
    return (
      <Block direction="column" {...props}>
        {wrappedChildren}
      </Block>
    );
  }

  const ds = generateItemDimensions(children, dimensions);
  const wrappedChildren = Children.map(children,
    (child, idx) => (
      <Block
        width={ds[idx]}
        paddingRight={idx < children.length - 1 ? gap : 0}
      >
        {isValidElement(child) ? cloneElement(child, {
          flex: 1,
        }) : child}
      </Block>
    ));

  return (
    <Block direction="row" {...props}>
      {wrappedChildren}
    </Block>
  );
};

Grid.propTypes = {
  flow: oneOf(['row', 'column']).isRequired,
  children: node.isRequired,
  dimensions: arrayOf(oneOfType([string, number])).isRequired,
  gap: getThemePropType('spacing'),
};

Grid.defaultProps = {
  display: 'flex',
  flow: 'column',
  dimensions: [],
};

export default Grid;
