import React, { Fragment } from 'react';
import styled from 'styled-components';
import { bool, string, func } from 'prop-types';

import { palette as palettePropType } from 'sly/propTypes/palette';
import { size, palette } from 'sly/components/themes';
import { Icon, Span, Link } from 'sly/components/atoms';

const getColor = ({ palette: paletteProp }) => palette(paletteProp, 'filler');

const Wrapper = styled.div`
  padding: ${size('spacing.large')};
  display: flex;
  background-color: ${getColor};
  border-radius: ${size('border.xLarge')};
`;

const LoyaltyIcon = styled(Icon)`
  margin-right: ${size('spacing.large')};
`;

const TopWrapper = styled.div`
  margin-bottom: ${size('spacing.regular')};
`;

const SmallScreenLearnMore = styled(Link)`
  font-weight: ${size('weight.medium')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`;

const BigScreenLearnMore = styled(Link)`
  display: none;
  font-weight: ${size('weight.medium')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: initial;
  }
`;

const OfferNotification = ({
  palette: paletteProp, title, description, hasLearnMore, className, onLearnMoreClick,
}) => (
  <Wrapper palette={paletteProp} className={className}>
    <LoyaltyIcon icon="baseline-loyalty" size="large" palette={paletteProp} variation="dark" />
    <div>
      <TopWrapper>
        {title && <Span weight="medium" size="body">{title}</Span>}
        {title && description && <Fragment>&nbsp;-&nbsp;</Fragment>}
        {description && <Span>{description}</Span>}
      </TopWrapper>
      {hasLearnMore &&
        <Fragment>
          <BigScreenLearnMore onClick={onLearnMoreClick}>Click here to learn more.</BigScreenLearnMore>
          <SmallScreenLearnMore onClick={onLearnMoreClick}>Learn more.</SmallScreenLearnMore>
        </Fragment>}
    </div>
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
