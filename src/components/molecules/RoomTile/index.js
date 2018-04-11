import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette, key } from 'styled-theme';
import numeral from 'numeral';

import { size } from 'sly/components/themes';
import { Button } from 'sly/components/atoms';

const width = ({ tileSize }) => size('tile', tileSize, 'width');
const height = ({ tileSize }) => size('tile', tileSize, 'height');

const Wrapper = styled.div`
    display: inline-block;
    border: ${size('border')} solid ${palette('grayscale', 0, true)};
    width: 100%;
    transition: box-shadow ${key('transitions.default')}, opacity ${key('transitions.default')};
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
        width: auto;
    }
    &:hover {
        cursor: default;
        box-shadow: 0 ${size('spacing.small')} ${size('spacing.regular')} ${palette('grayscale', 1, true)};
        opacity: 0.75;
        background: ${palette('white', 2)};

        Button {
            display: initial;
        }
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
const ImageButtonContainer = styled.div`
    position: relative;

    Button {
        display: none;
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);

    }
`;

const RoomTile = ({
  img, price, type, onInquireOrBookClicked, ...props
}) => {
  return (
        <Wrapper>
            <ImageButtonContainer>
                <StyledImg tileSize='small' src={img} />
                <Button onClick={onInquireOrBookClicked}>Inquire or book a tour</Button>
            </ImageButtonContainer>
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
    onInquireOrBookClicked: PropTypes.func.isRequired,
};

export default RoomTile;
