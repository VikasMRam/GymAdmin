import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { string, arrayOf, shape, object, bool, func } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import Link from 'sly/components/atoms/Link';
import { Td, StageDiv, DoubleLineDiv } from 'sly/components/atoms/Table';
import Hr from 'sly/components/atoms/Hr';
import Icon from 'sly/components/atoms/Icon';

const Wrapper = styled.div`
  padding: ${size('spacing.large')};
  border: ${size('border.regular')} solid ${palette('grey', 'filler')};
  border-radius: ${size('border.xLarge')};

  ${ifProp('disabled', css`
    background-color: ${palette('grey', 'background')};
  `)};
`;

const HeadingLinkWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};

  ${ifProp('icon', css`
    display: flex;
    > span {
      margin-left: auto;
    }
  `)};
`;

const StyledHr = styled(Hr)`
  margin-left: -${size('spacing.large')};
  margin-right: -${size('spacing.large')};
`;

const TableRowCard = ({
  heading, href, to, id, rowItems, disabled, icon, iconPalette, onHeadingClick,
}) => {
  const itemsLength = rowItems.length;
  const rowComponent = rowItems.map((rowItem, i) => {
    const hrComponent = (itemsLength - 1 !== i && <StyledHr size="large" />);
    const { type, data } = rowItem;
    if (type === 'stage') {
      const { text, currentStage, palette } = data;
      return (
        <Fragment key={text}>
          <StageDiv text={text} currentStage={currentStage} palette={palette} disabled={disabled} borderless />
          {hrComponent}
        </Fragment>
      );
    } else if (type === 'doubleLine') {
      const { firstLine, secondLine } = data;
      return (
        <Fragment key={firstLine}>
          <DoubleLineDiv firstLine={firstLine} secondLine={secondLine} disabled={disabled} borderless />
          {hrComponent}
        </Fragment>
      );
    }
    return <Td key={`Td_${id}`} />;
  });
  return (
    <Wrapper disabled={disabled}>
      <HeadingLinkWrapper icon={icon}>
        <Link href={href} to={to} onClick={onHeadingClick} size="caption" weight="medium">{heading}</Link>
        {icon && <Icon icon={icon} palette={iconPalette} />}
      </HeadingLinkWrapper>
      {rowComponent}
    </Wrapper>
  );
};

TableRowCard.propTypes = {
  heading: string.isRequired,
  href: string,
  to: string,
  id: string.isRequired,
  rowItems: arrayOf(shape({
    type: string.isRequired,
    data: object.isRequired,
  }).isRequired),
  disabled: bool,
  icon: string,
  iconPalette: string,
  onHeadingClick: func,
};

export default TableRowCard;
