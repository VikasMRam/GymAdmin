import React from 'react';
import { number, string, bool } from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { size, palette } from 'sly/common/components/themes';
import { formatMoney } from 'sly/web/services/helpers/numbers';
import {  Icon, Paragraph } from 'sly/common/components/atoms';
import { isBrowser } from 'sly/web/config';
import { Block, Span,  Link } from 'sly/common/system';


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

const StyledCommunityPricingWrapper = styled.div`
  min-width:0;
  overflow:hidden;
  text-overflow:ellipsis;
`;


const StyledIcon = styled(Icon)`
  color: ${palette('slate.lighter-60')};
  margin-left: ${size('spacing.small')};
  vertical-align: text-top;
`;

const CommunityPricing = ({ id, estimated, price, color, className, font, tipId, tooltipPos, max, isFooter }) => (
  <StyledCommunityPricingWrapper className={className}>
    {estimated &&
      <Block pad="xs" font="body-s">
        <Block
          cursor="pointer"
          font="body-s"
          color="slate"
          pad="xs"
          textDecoration="underline"
          data-tip
          data-for={tipId}
        >
          Seniorly Estimate
          <StyledIcon palette="slate" icon="help" font="body-s" />
        </Block>
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
              <Span color="primary">The Seniorly Estimate</Span>{' '}
              is an estimated monthly price based on the local average costs at other communities in the area and what typical communities of the same size offer in services.
            </Paragraph>
            <Paragraph>
              Please verify all information prior to making a decision. Seniorly is not responsible for any errors regarding the information displayed on this website.
            </Paragraph>
            <Paragraph>
              Are you an owner or operator of this community? To update pricing and information {' '}
              <Link
                href={`/partners/communities?prop=${id}&sly_category=estimatedPricing&sly_action=cta_link&sly_label=claim`}
                target="_blank"
              >
                click here to claim this community.
              </Link>
            </Paragraph>
          </TooltipContent>
        )}
      </Block>
    }
    {!estimated && !max &&
    <Block pad="xxxs" font={isFooter ? 'body-s' : 'body-m'}>
      Pricing starts from
    </Block>
    }
    {!estimated && !!max &&
    <Block pad="xxxs" font={isFooter ? 'body-s' : 'body-m'}>
      Pricing ranges from
    </Block>
    }
    <Block minWidth="0" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
      <Block whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" font={font} weight="medium" color={color} >
        {formatMoney(price)}{!!max && ` - ${formatMoney(max)}`}
        <Span font="body-m" color={color}>
          /mo<Block display={isFooter ? 'none' : 'initial'} sx$tablet={{ display: 'initial' }}  >nth</Block>
        </Span>
      </Block>

    </Block>
  </StyledCommunityPricingWrapper>
);


CommunityPricing.propTypes = {
  price: number.isRequired,
  className: string,
  id: string.isRequired,
  estimated: bool.isRequired,
  tooltipPos: string,
  tipId: string,
  max: number,
  isFooter: bool,
  color: string,
  font: string,
};

CommunityPricing.defaultProps = {
  color: 'primary',
  font: 'title-s-azo',
  tipId: 'estimate',
  isFooter: false,
};

export default CommunityPricing;
