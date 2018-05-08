import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette, key } from 'styled-theme';

import { size } from 'sly/components/themes';
import SimilarCommunityInfo from 'sly/components/molecules/SimilarCommunityInfo';

// TODO : Tech Dept - Similar Code as of RoomTile Molecule. Find how to reuse

const defaultImage =
  '//d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';

const Wrapper = styled.div`
  display: inline-block;
  border: ${p => (p.borderless ? 0 : size('border.regular'))} solid
    ${palette('grayscale', 2)};
  width: ${size('tile', 'large', 'width')};
  transition: box-shadow ${key('transitions.default')},
    opacity ${key('transitions.default')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    width: auto;
  }

  &:hover {
    cursor: default;
    box-shadow: 0 ${size('spacing.small')} ${size('spacing.regular')}
      ${palette('grayscale', 1, true)};
    opacity: 0.75;
    background: ${palette('white', 2)};

    button {
      display: initial;
    }
  }
`;

const SCTileImage = styled.img`
  width: ${size('tile', 'large', 'width')};
  height: ${size('tile', 'large', 'height')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tile', 'regular', 'width')};
    height: ${size('tile', 'regular', 'height')};
  }
`;

const ChildrenWrapper = styled.div`
  margin-top: ${size('spacing.large')};
  margin-right: ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};
  margin-left: ${size('spacing.xLarge')};
`;

const SimilarCommunityTile = ({ similarProperty, onClick, borderless }) => {
  const { mainImage } = similarProperty;
  return (
    <Wrapper onClick={onClick} borderless={borderless}>
      {/* div is for the image below. If removed, the image dimensions wont adhere to the seize being set */}
      <div>
        <SCTileImage src={mainImage || defaultImage} />
      </div>
      <ChildrenWrapper>
        <SimilarCommunityInfo similarProperty={similarProperty} />
      </ChildrenWrapper>
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
