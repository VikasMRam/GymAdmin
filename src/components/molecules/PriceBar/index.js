import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import { size } from 'sly/components/themes';
import { Bar, Block } from 'sly/components/atoms';

const TextWrapper = styled.div`
  margin-left: ${size('spacing.regular')};
`;
const TwoColumnWrapper = styled.div`
  display: flex;
`;

const PriceBar = ({
  width, price, ...props
}) => {
  return (
    <TwoColumnWrapper {...props}>
      <Bar width={width * 0.8} />
      <TextWrapper>
        <Block size="caption">
          <NumberFormat value={price} displayType="text" thousandSeparator prefix="$" />
        </Block>
      </TextWrapper>
    </TwoColumnWrapper>
  );
};

PriceBar.propTypes = {
  width: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default PriceBar;
