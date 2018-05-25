import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette, key } from 'styled-theme';

import { size } from 'sly/components/themes';
import { Lazy } from 'react-lazy';
import { Image, Button } from 'sly/components/atoms';
import SimilarCommunityInfo from 'sly/components/molecules/SimilarCommunityInfo';

// TODO : Tech Debt - Similar Code as of RoomTile Molecule. Find how to reuse

const defaultImage =
  '//d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: ${p => (p.borderless ? 0 : size('border.regular'))} solid
    ${palette('grayscale', 2)};
  transition: box-shadow ${key('transitions.default')},
  opacity ${key('transitions.default')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.large')};
    flex-direction: row;
    width: auto;
  }

  // because we are passing aspectRatio prop, we have a relative position
  // in the Image so we can use here absolute
  Button {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 ${size('spacing.small')} ${size('spacing.regular')}
      ${palette('grayscale', 1, true)};
    opacity: 0.75;
    background: ${palette('white', 2)};

    Button {
      display: initial;
    }
  }
`;

const ImageWrapper = styled(Image)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tile.regular.width')};
    height: ${size('tile.regular.height')};
    padding-top: unset;
    flex-shrink: 1;

    > img {
      position: relative;
      width: ${size('tile.regular.width')};
      height: ${size('tile.regular.height')};
      max-width: none;
    }
  }
`;

const Info = styled(SimilarCommunityInfo)`
  margin-top: ${size('spacing.regular')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-top: 0;
    margin-left: ${size('spacing.large')};
  }
`;

const SimilarCommunityTile = ({ similarProperty, onClick, borderless }) => {
  const { imageUrl } = similarProperty;

  return (
    <Wrapper onClick={onClick} borderless={borderless}>
      {/*<Lazy component="div" ltIE9>*/}
      <ImageWrapper src={imageUrl || defaultImage} aspectRatio='16:9'>
        <Button onClick={onClick}>See More Details</Button>
      </ImageWrapper>
      {/*</Lazy>*/}
      <Info similarProperty={similarProperty} />
    </Wrapper>
  );
};

SimilarCommunityTile.propTypes = {
  similarProperty: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  borderless: PropTypes.bool,
};

SimilarCommunityTile.defaultProps = {
  borderless: false,
};

export default SimilarCommunityTile;
