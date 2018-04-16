import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import numeral from 'numeral';

import { size } from 'sly/components/themes';
import { Bar, Block } from 'sly/components/atoms';

const TextWrapper = styled.div`
  margin-left: ${size('spacing.regular')};
`;
const TwoColumnWrapper = styled.div`
  display: flex;
`;

const PriceBar = ({
  width, price,
}) => {
  return (
    <TwoColumnWrapper>
      <Bar width={width} />
      <TextWrapper>
        <Block size="caption">
          ${numeral(price).format('0,0')}
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
