import React from 'react';
import styled, { css } from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { string } from 'prop-types';

import { Block, Span, color, space, Paragraph } from 'sly/common/system';
import { isBrowser } from 'sly/web/config';
import { Help } from 'sly/common/icons';

const overridePosition = ({ left, top }) => ({
  top,
  left: left < 5 ? 5 : left,
});

const StyledHelpIcon = styled(Help)`
  margin-left: ${space('spacing.xxs')};
  color: ${color('slate.lighter-60')};
  vertical-align: text-top;
`;

const TooltipContent = styled(ReactTooltip)`
  padding: ${space('xs')}!important;
  color: ${color('slate')}!important;
  background-color: ${color('white')}!important;
  box-shadow: 0 0 ${space('m')} ${color('slate.lighter-80')}80;
`;

const ListingPricing = ({ startingRate }) => {
  return (
    <Block as="span">
      <Block
        as="span"
        display="flex"
        flexDirection="row"
        alignItems="center"
        css={css`
                gap: 0.2em
              `}
      >
        <Span
          palette="stale"
          pad="small"
          font="body-s"
        >Exclusive Seniorly Price
        </Span>
        <StyledHelpIcon  size="s" data-tip data-for="seniorlyPrice" />
        {isBrowser &&
        <TooltipContent overridePosition={overridePosition} id="seniorlyPrice" type="light" effect="solid" multiline>
          This is special discouted price offered only through Seniorly.
        </TooltipContent>
          }
      </Block>
      <Paragraph
        color="viridian.base"
        pad="small"
      >${startingRate}/month + care fees
      </Paragraph>

    </Block>
  );
};

ListingPricing.propTypes = {
  startingRate: string,
};

export default ListingPricing;
