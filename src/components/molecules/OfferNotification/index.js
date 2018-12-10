import React, { Fragment } from 'react';
import styled from 'styled-components';
import { bool, string, func } from 'prop-types';

import { palette as palettePropType } from 'sly/propTypes/palette';
import { size, palette } from 'sly/components/themes';
import { Icon, Block, Link } from 'sly/components/atoms';

const getColor = ({ palette: paletteProp }) => palette(paletteProp, 'filler');

const Wrapper = styled.div`
  padding: ${size('spacing.large')};
  display: flex;
  background-color: ${getColor};
`;

const LoyaltyIcon = styled(Icon)`
  margin-right: ${size('spacing.large')};
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeading = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const SmallScreenLearnMore = styled(Link)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`;

const BigScreenLearnMore = styled(Link)`
  display: none;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: initial;
  }
`;

const OfferNotification = ({
  palette: paletteProp, title, description, hasLearnMore, className, onLearnMoreClick,
}) => (
  <Wrapper palette={paletteProp} className={className}>
    <LoyaltyIcon icon="baseline-loyalty" size="large" palette={paletteProp} variation="dark" />
    <TextSection>
      {title && <StyledHeading weight="medium" size="body">{title}</StyledHeading>}
      {description && <Block size="caption" weight="medium">{description}</Block>}
      {hasLearnMore &&
        <Fragment>
          <BigScreenLearnMore onClick={onLearnMoreClick}>Click here to learn more</BigScreenLearnMore>
          <SmallScreenLearnMore onClick={onLearnMoreClick}>Learn more</SmallScreenLearnMore>
        </Fragment>}
    </TextSection>
  </Wrapper>
);

OfferNotification.propTypes = {
  palette: palettePropType,
  hasLearnMore: bool,
  title: string.isRequired,
  description: string,
  onLearnMoreClick: func,
  className: string,
};

OfferNotification.defaultProps = {
  palette: 'primary',
};

export default OfferNotification;
