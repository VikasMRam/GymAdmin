import React from 'react';
import { number, string, oneOf } from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';

import { palette } from 'sly/components/themes';
import { Icon } from 'sly/components/atoms';

const times = (nr, fn) => Array.from(Array(nr).keys()).map((_, i) => fn(i));

const getWidth = (current, total) => {
  if (total > current + 1) return 100;
  else if (total < current) return 0;
  return ((total - current) * 80) + 10;
};

const Wrapper = styled.div`
  display: flex;
  line-height: 1;
`;

const BaseIcon = styled(Icon)`
  svg {
    color: ${palette(2)};
  }
`;

export const PositionedMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: ${prop('width')}%;

  svg {
    color: ${palette(0)};
  }
`;

const Star = styled.div`
  position: relative;
`;

const Rating = ({
  palette, value, size, ...props
}) => {
  // TODO: fix hardcoded stroke size in svg
  const stars = times(5, i => (
    <Star key={`star${i}`}>
      <BaseIcon
        icon="star"
        size={size}
        palette={palette}
      />
      <PositionedMask palette={palette} width={getWidth(i, value)}>
        <Icon
          icon="star"
          size={size}
        />
      </PositionedMask>
    </Star>
  ));

  return <Wrapper {...props}>{stars}</Wrapper>;
};

Rating.propTypes = {
  size: oneOf(['small', 'regular']),
  value: number.isRequired,
  palette: string,
};

Rating.defaultProps = {
  size: 'regular',
  palette: 'primary',
};

export default Rating;
