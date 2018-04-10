import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import numeral from 'numeral';

import { size } from 'sly/components/themes';

const width = ({ tileSize }) => size('tile', tileSize, 'width');
const height = ({ tileSize }) => size('tile', tileSize, 'height');

const Wrapper = styled.div`
    display: inline-block;
    border: ${size('border')} solid ${palette('grayscale', 0, true)};
    width: 100%;
    transition: box-shadow .4s ease-out;
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
        width: auto;
    }
    &:hover {
        cursor: default;
        box-shadow: ${size('spacing.nano')} ${size('spacing.nano')} ${size('spacing.regular')} ${size('spacing.nano')} ${palette('shadow', 0, true)};
    }
`;
// TODO: create a img component that understand sly's resampling configurations
const StyledImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${width};
    height: ${height};
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
                {typeText[type]}<br />${numeral(price).format('0,0')} per month
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
