import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


import { size, palette, key } from 'sly/components/themes';
import { Image, Block, Link } from 'sly/components/atoms';

import Heading from 'sly/components/atoms/Heading';

export const Wrapper = styled(Link)`
  margin-top: ${size('spacing.xxxLarge')};
  display: block;
  position: relative;
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
  margin-bottom: ${size('spacing.large')};
  width: 100%;
`;

export const WrappedImage = styled(Image)`
  background: white;
  margin-top: -${size('spacing.xxxLarge')};
  margin-left: ${size('spacing.xxLarge')};
`;

export const ItemDescription = styled.div`
  margin: ${size('spacing.large')};
  margin-top: 0;
  margin-bottom: ${size('spacing.xLarge')};
`;

export const StyledHeading = styled(Heading)`
  margin: ${size('spacing.regular')} 0;
  line-height: ${size('lineHeight.body')};
`;

const TextBlock = styled(Block)`
  line-height: ${size('lineHeight.body')};
`;

const ReasonTile = ({
  image, title, text, to, ...props
}) => (
  <Wrapper to={to} {...props}>
    <WrappedImage src={image} />
    <ItemDescription>
      <StyledHeading level="subtitle" size="subtitle">{title}</StyledHeading>
      <TextBlock size="subtitle" palette="slate">
        {text}
      </TextBlock>
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
