import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette, key } from 'styled-theme';

import { size } from 'sly/components/themes';
import { Image, Block, Link } from 'sly/components/atoms';
import Heading from 'sly/components/atoms/Heading';

export const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;

  transition: box-shadow ${key('transitions.default')},
    opacity ${key('transitions.default')};
  width: 100%;
  margin-bottom: ${size('spacing.large')};

  &:hover {
    cursor: pointer;
    box-shadow: 0 ${size('spacing.small')} ${size('spacing.regular')}
      ${palette('grayscale', 1, true)};
    opacity: 0.75;
    background: ${palette('white', 0)};
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('picture', 'regular', 'width')};
    margin-bottom: ${size('spacing.large')};

    :nth-child(odd) {
      margin-right: ${size('spacing.xLarge')};
    }
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('picture', 'small', 'width')};
    margin-right: ${size('spacing.xLarge')};

    :last-child {
      margin-right: 0;
    }
  }
`;

export const WrappedImage = styled(Image)`
  width: 100%;
  border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  border-bottom: 0;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('picture', 'regular', 'width')};
    height: ${size('picture', 'regular', 'height')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('picture', 'small', 'width')};
    height: ${size('picture', 'small', 'height')};
  }
`;

export const ItemDescription = styled.div`
  padding: ${size('spacing.large')};
  border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  border-top: 0;
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
`;

export const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;

const ReasonTile = ({
  image, title, text, to, ...props
}) => (
  <Wrapper to={to} {...props}>
    <WrappedImage src={image} aspectRatio="4:3" />
    <ItemDescription>
      <StyledHeading level="subtitle">{title}</StyledHeading>
      <Block>{text}</Block>
    </ItemDescription>
  </Wrapper>
);

ReasonTile.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  to: PropTypes.string,
};

export default ReasonTile;
