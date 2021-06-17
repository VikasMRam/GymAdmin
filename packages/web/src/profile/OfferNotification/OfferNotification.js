import React from 'react';
import styled from 'styled-components';
import { bool, string } from 'prop-types';

import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { size } from 'sly/common/components/themes';
import Offer from 'sly/common/icons/Offer';
import { Block, Span, Link, Flex } from 'sly/common/system';
import GetCustomPricingContainer from 'sly/web/containers/GetCustomPricingContainer';

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
  title,
  description,
  hasLearnMore,
  className,
  hasAlreadyRequestedPricing,
  ...props
}) => (
  <Flex
    background="yellow.lighter-80"
    p="m"
    border="box"
    justifyContent="space-between"
    borderColor="yellow.lighter-80"
    {...props}
  >
    <div>
      <Block>
        {title && (
          <Block mb="xxs" font="title-xs-azo">
            {title}
          </Block>
        )}
        {description && <Span>{description}</Span>}
      </Block>
      {hasLearnMore && (
        <GetCustomPricingContainer hasAlreadyRequestedPricing={hasAlreadyRequestedPricing} locTrack="offer">
          {getPricing => (
            <>
              <BigScreenLearnMore onClick={getPricing}>
                Click here to learn more.
              </BigScreenLearnMore>
              <SmallScreenLearnMore onClick={getPricing}>
                Learn more.
              </SmallScreenLearnMore>
            </>
          )}
        </GetCustomPricingContainer>
      )}
    </div>
    <Offer color="yellow" ml="xs" />
  </Flex>
);

OfferNotification.propTypes = {
  palette: palettePropType,
  hasLearnMore: bool,
  title: string.isRequired,
  description: string,
  className: string,
  hasAlreadyRequestedPricing: bool,
};

OfferNotification.defaultProps = {
  palette: 'primary',
};

export default OfferNotification;
