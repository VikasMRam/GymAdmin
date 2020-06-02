import React from 'react';
import { number, string, bool } from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { size, palette } from 'sly/web/components/themes';
import { text as textPropType } from 'sly/web/propTypes/text';
import { palette as palettePropType } from 'sly/web/propTypes/palette';
import { variation as variationPropType } from 'sly/web/propTypes/variation';
import pad from 'sly/web/components/helpers/pad';
import { formatMoney } from 'sly/web/services/helpers/numbers';
import { Block, Icon, Paragraph, Link, Span } from 'sly/web/components/atoms';
import { isBrowser } from 'sly/web/config';

const overridePosition = ({ left, top }) => ({
  top,
  left: left < 5 ? 5 : left,
});
const TooltipContent = styled(ReactTooltip)`
  padding: ${size('spacing.large')}!important;
  color: ${palette('slate', 'base')}!important;
  background-color: ${palette('white', 'base')}!important;
  box-shadow: 0 0 ${size('spacing', 'large')} ${palette('slate', 'filler')}80;
  max-width: ${size('tile.large.width')};
`;

const StyledParagraph = styled(Paragraph)`
  text-decoration: underline;
  margin-bottom: ${size('spacing.small')};
  color: ${palette('slate', 'base')};
  font-size: ${size('text.caption')};
  cursor: pointer;
`;

const StyledCommunityPricingWrapper = styled.div`
  min-width: ${size('element.xxHuge')};
`;

const DescriptionBlock = pad(Block, 'regular');

const StyledIcon = styled(Icon)`
  margin-left: ${size('spacing.small')};
  vertical-align: text-top;
`;

const CommunityPricing = ({ id, estimated, price, palette, variation, className, size, tipId, tooltipPos }) => (
  <StyledCommunityPricingWrapper className={className}>
    {estimated &&
      <DescriptionBlock size="caption">
        <StyledParagraph>
          Seniorly Estimate
          <StyledIcon palette="slate" icon="help" size="caption" data-tip data-for={tipId} />
        </StyledParagraph>
        {isBrowser && (
          <TooltipContent
            id={tipId}
            type="light"
            effect="solid"
            multiline
            event="click"
            clickable
            globalEventOff="click"
            overridePosition={overridePosition}
            place={tooltipPos || 'bottom'}
          >
            <Paragraph>
              <Span palette="primary">The Seniorly Estimate</Span>{' '}
              estimated monthly pricing is based on the local average pricing of other communities in the area and what
              typical communities of the same size offer in services.
            </Paragraph>
            <Paragraph>
              Please verify all information prior to making a decision. Seniorly is not responsible for any errors
              regarding the information displayed on this website.
            </Paragraph>
            <Paragraph>
              If you manage the community and would like to update your pricing.{' '}
              <Link
                href={`/partners/communities?prop=${id}&sly_category=estimatedPricing&sly_action=cta_link&sly_label=claim`}
                target="_blank"
              >
                Click here
              </Link>
            </Paragraph>
          </TooltipContent>
        )}
      </DescriptionBlock>
    }
    {!estimated &&
    <DescriptionBlock size="caption">
      Pricing starts from
    </DescriptionBlock>
    }
    <Block>
      <Span size={size} weight="medium" palette={palette} variation={variation}>
        {formatMoney(price)}
      </Span>
      <Span palette={palette} variation={variation}>
        /month
      </Span>
    </Block>
  </StyledCommunityPricingWrapper>
);


CommunityPricing.propTypes = {
  price: number.isRequired,
  palette: palettePropType,
  variation: variationPropType,
  className: string,
  id: string.isRequired,
  estimated: bool.isRequired,
  size: textPropType,
  tooltipPos: string,
  tipId: string,
};

CommunityPricing.defaultProps = {
  palette: 'primary',
  variation: 'base',
  size: 'title',
  tipId: 'estimate',
};

export default CommunityPricing;
