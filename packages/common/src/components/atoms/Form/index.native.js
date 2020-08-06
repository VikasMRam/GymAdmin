import React, { Children, isValidElement, cloneElement } from 'react';
import { func, node } from 'prop-types';

import { View } from 'sly/mobile/components/atoms';

const Form = ({ onSubmit, children, ...props }) => {
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child) && child.props.type === 'submit') {
      return cloneElement(child, { onPress: onSubmit });
    }

    return child;
  });

  return <View {...props}>{childrenWithProps}</View>;
};

Form.propTypes = {
  onSubmit: func,
  children: node,
};

export default Form;
