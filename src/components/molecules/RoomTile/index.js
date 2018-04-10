import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import { FormattedPrice } from 'sly/components/atoms';

const width = ({ tileSize }) => size('tile', tileSize, 'width');
const height = ({ tileSize }) => size('tile', tileSize, 'height');

const Wrapper = styled.div`
    display: inline-block;
    border: ${size('border')} solid ${palette('grayscale', 0, true)};
    width: 100%;
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
        width: auto;
    }
`;
// TODO: create a img component that understand sly's resampling configurations
const StyledImg = styled.img`
  object-fit: cover;
  width: ${width};
  height: ${height};
  @media screen and (max-width: ${size('breakpoint.tablet')}) {
    width: 100%;
    height: 100%;
  }
`;
const ItemDescription = styled.div`
  padding: ${size('spacing.large')};
`;
const typeText = {
    'shared': 'Shared Room',
    'private': 'Private Studio',
    '1bedroom': '1 Bedroom',
};

const RoomTile = ({
  img, price, type, ...props
}) => {
  return (
        <Wrapper>
            <StyledImg tileSize='small' src={img} />
            <ItemDescription>
                {typeText[type]}<br />$<FormattedPrice price={price} /> per month
            </ItemDescription>
        </Wrapper>
  );
};

RoomTile.propTypes = {
    img: PropTypes.string,
    price: PropTypes.number.isRequired,
    type:  PropTypes.oneOf(['shared', 'private', '1bedroom']).isRequired,
};

export default RoomTile;
