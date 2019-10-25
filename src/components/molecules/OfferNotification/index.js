import React from 'react';
import styled from 'styled-components';
import { bool, string } from 'prop-types';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { size, palette } from 'sly/components/themes';
import { Icon, Span, Link } from 'sly/components/atoms';
import AskAgentQuestionButtonContainer from 'sly/containers/AskAgentQuestionButtonContainer';

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

const SmallScreenLearnMore = styled(AskAgentQuestionButtonContainer)`
  font-weight: ${size('weight.medium')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`;

const BigScreenLearnMore = styled(AskAgentQuestionButtonContainer)`
  display: none;
  font-weight: ${size('weight.medium')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: initial;
  }
`;

const OfferNotification = ({
  palette: paletteProp,
  title,
  description,
  hasLearnMore,
  className,
}) => (
  <Wrapper palette={paletteProp} className={className}>
    <LoyaltyIcon
      icon="baseline-loyalty"
      size="large"
      palette={paletteProp}
      variation="dark"
    />
    <div>
      <TopWrapper>
        {title && (
          <Span weight="medium" size="body">
            {title}
          </Span>
        )}
        {title && description && <>&nbsp;-&nbsp;</>}
        {description && <Span>{description}</Span>}
      </TopWrapper>
      {hasLearnMore && (
        <>
          {/*<BigScreenLearnMore Component={Link}>Click here to learn more.</BigScreenLearnMore>*/}
          {/*<SmallScreenLearnMore Component={Link}>Learn more.</SmallScreenLearnMore>*/}
        </>
      )}
    </div>
  </Wrapper>
);

OfferNotification.propTypes = {
  palette: palettePropType,
  hasLearnMore: bool,
  title: string.isRequired,
  description: string,
  className: string,
};

OfferNotification.defaultProps = {
  palette: 'primary',
};

export default OfferNotification;
