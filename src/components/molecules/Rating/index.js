import React, { Component } from 'react';
import { number, string, oneOf } from 'prop-types';
import styled from 'styled-components';

import Icon from 'sly/components/atoms/Icon';

const times = (nr, fn) => Array.from(Array(nr).keys()).map((_, i) => fn(i));

const getValue = (current, total) => {
  if (total > (current + 1)) return 100;
  else if (total < current) return 0;
  return (total - current) * 100;
};

const getTransform = (i, total) => svg => 
  svg.replace('%WIDTH%', `${getValue(i, total)}%`); 

const Rating = ({ palette, value, size }) => { 
  // tranform hack due to FF not having implemented SVG 2
  // TODO: fix hardcoded stroke size in svg
  const stars = times(5, i => (
    <Icon 
      key={i} 
      icon="star-clip" 
      size={size} 
      palette={palette}
      transform={getTransform(i, value)} />
  )); 

  return (
    <div>
      {stars}
    </div>
  );
};

Rating.propTypes = {
  size: oneOf(['small', 'regular', 'large']),
  value: number.isRequired,
  palette: string,
};

Rating.defaultProps = {
  size: 'regular',
  palette: 'secondary',
};

export default Rating;
