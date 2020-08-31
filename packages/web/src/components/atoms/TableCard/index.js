import React from 'react';
import styled, { css } from 'styled-components';
import { prop } from 'styled-tools';
import {
  string,
  any, func,
} from 'prop-types';

import { size, palette } from 'sly/common/components/themes';
import Link from 'sly/common/components/atoms/Link';
import mobileOnly from 'sly/web/components/helpers/mobileOnly';
import borderRadius from 'sly/web/components/helpers/borderRadius';
import pad from 'sly/web/components/helpers/pad';
import { ClampedText, Td, Tr } from 'sly/web/components/atoms';

export const CardRow = mobileOnly(borderRadius(pad(Tr, 'large'), 'small'), css`
  display: flex;
  flex-direction: column;
  padding: ${size('spacing.large')};
  background: ${palette('white', 'base')};
  border: ${size('spacing.nano')} solid ${palette('slate', 'stroke')};
`);

const StyledLinkCell = ({
  children, to, onClick, ...props
}) => (
  <Td {...props}>
    <ClampedText>
      <Link to={to} onClick={onClick}>
        {children}
      </Link>
    </ClampedText>
  </Td>
);

StyledLinkCell.propTypes = {
  children: string,
  to: string,
  onClick: func,
  order: string,
};

export const LinkCell = mobileOnly(pad(StyledLinkCell, 'regular'), css`
  order: ${prop('order', '1')};
`);

const StyledTd = styled(Td)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    span:first-child {
      display: none;
    }
  }
`;

const StyledCellWithLabel = ({ children, label, ...props }) => (
  <StyledTd {...props}>
    <span>{label}</span>
    <span>{children}</span>
  </StyledTd>
);

StyledCellWithLabel.propTypes = {
  label: string,
  children: any,
};

export const CellWithLabel = pad(mobileOnly(StyledCellWithLabel, css`
  order: ${prop('order', '1')};

  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: ${size('text.caption')};

  span:first-child {
    display: inline;
  }
`), 'regular');

CellWithLabel.propTypes = {
  order: string,
};
