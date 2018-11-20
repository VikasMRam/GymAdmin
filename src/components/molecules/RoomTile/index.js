import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NumberFormat from 'react-number-format';

import { size, palette, key } from 'sly/components/themes';
import { Button, TileImage } from 'sly/components/atoms';
import { Lazy } from 'react-lazy';

const priceTypeMap = {
  'Monthly Rate': 'month',
  'Daily Rate': 'day',
};

const defaultImage = '//d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';

const Wrapper = styled.div`
    display: inline-block;
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
    width: 100%;
    transition: box-shadow ${key('transitions.default')}, opacity ${key('transitions.default')};
    @media screen and (min-width: ${size('breakpoint.mobile')}) {
      width: auto;
    }
    &:hover {
      cursor: default;
      box-shadow: 0 ${size('spacing.small')} ${size('spacing.regular')} ${palette('slate', 1, true)};
      opacity: 0.75;
      background: ${palette('white', 2)};

      Button {
        display: initial;
      }
    }
`;
const ItemDescription = styled.div`
  padding: ${size('spacing.large')};
`;
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
  image, roomType, shareType, price, priceShared, priceType, onInquireOrBookClicked,
}) => {
  let priceToShow = price;
  if (shareType === 'Shared') {
    priceToShow = priceShared;
  }

  return (
    <Wrapper>
      <ImageButtonContainer>
        <Lazy
          component="div"
          ltIE9
        >
          <TileImage tileSize="small" src={image || defaultImage} alt={`${roomType} ${shareType}`} />
        </Lazy>
        <Button onClick={onInquireOrBookClicked}>Inquire or book a tour</Button>
      </ImageButtonContainer>
      <ItemDescription>
        {roomType} {shareType}<br /><NumberFormat value={priceToShow} displayType="text" thousandSeparator prefix="$" /> per {priceTypeMap[priceType]}
      </ItemDescription>
    </Wrapper>
  );
};

RoomTile.propTypes = {
  image: PropTypes.string,
  roomType: PropTypes.string.isRequired,
  shareType: PropTypes.string.isRequired,
  price: PropTypes.number,
  priceShared: PropTypes.number,
  priceType: PropTypes.oneOf(Object.keys(priceTypeMap)).isRequired,
  onInquireOrBookClicked: PropTypes.func,
};

export default RoomTile;
