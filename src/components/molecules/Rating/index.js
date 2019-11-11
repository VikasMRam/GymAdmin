import React, { Fragment } from 'react';
import { number, string, oneOf } from 'prop-types';
import styled from 'styled-components';

import { palette, size } from 'sly/components/themes';

const times = (nr, fn) => Array.from(Array(nr).keys()).map((_, i) => fn(i));

const iconSize = props => size('icon', props.size);

const Wrapper = styled.div`
  display: flex;
  line-height: 1;
`;

const StyledStar = styled.svg`
  width: 5rem;
  height: ${iconSize};
`;

const BaseStarPath = styled.path`
  color: ${palette('base')};
`;

const StarPath = (props) => <BaseStarPath
  fill="currentColor"
  fillRule="evenodd"

  d="M12 17.5l-4.672 2.456a1 1 0 0 1-1.451-1.054l.892-5.202-3.78-3.685a1 1 0 0 1 .555-1.706l5.223-.759 2.336-4.733a1 1 0 0 1 1.794 0l2.336 4.733 5.223.76a1 1 0 0 1 .555 1.705L17.23 13.7l.892 5.202a1 1 0 0 1-1.45 1.054L12 17.5z"
  {...props}
/>;

const StarFillPath = styled(StarPath)`
  color: ${palette('filler')};
`;

const randHash = () => Math.random().toString(36).substring(7);
const MaskedStar = ({ value, ...props }) => {
  const id = `star-mask-${randHash()}`;
  const x = Math.round(((value % 1) * 0.8 + 0.1 ) * 24);
  return (
    <>
      <mask id={id}>
        <rect x="0" y="0" width="24" height="24" fill="white"  />
        <rect x={x} y="0" width="24" height="24" fill="black"  />
      </mask>
      <StarPath mask={`url(#${id})`} {...props} />
    </>
  );
};

const Rating = ({
  palette, value, size, ...props
}) => {
  return (
    <>
      <Wrapper {...props}>
        <StyledStar size={size} viewBox="0 0 120 24">
          {times(5, i => (
            <Fragment key={`star${i}`}>
              {value >= i + 1 && <StarPath palette={palette} transform={`translate(${i*24}, 0)`} /> }
              {value < i + 1 && <StarFillPath palette={palette} transform={`translate(${i*24}, 0)`} /> }
              {value > i && value < i + 1 && <MaskedStar palette={palette} value={value} transform={`translate(${i*24}, 0)`} /> }
            </Fragment>
              ))}
        </StyledStar>
      </Wrapper>
    </>
  );
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
