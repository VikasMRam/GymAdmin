import React from 'react';
import styled from 'styled-components';
import { string, bool, func } from 'prop-types';
import dayjs from 'dayjs';

import pad from 'sly/components/helpers/pad';
import { size } from 'sly/components/themes';
import cursor from 'sly/components/helpers/cursor';
import { Box, Block, Icon, Span } from 'sly/components/atoms';

const StyledBox = styled(Box)`
  display: flex;
`;

const StyledBlock = pad(Block, 'regular');
StyledBlock.displayName = 'StyledBlock';

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.xLarge')};
`;

const SeconColumn = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
  }
`;

const StyledColumn = styled.div`
  margin-right: ${size('spacing.huge')};
  margin-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-bottom: initial;
  }
`;

const Date = styled(Block)`
  white-space: nowrap;
`;

const CursorSpan = cursor(Span);
CursorSpan.displayName = 'CursorSpan';

const FamilyActivityItem = ({
  title, description, icon, date, snap, noBorderRadius, className, onEditClick,
}) => {
  let dateString = '';
  const parsedDate = dayjs(date);
  if (!parsedDate.isValid()) {
    dateString = 'Failed to parse date';
  } else {
    dateString = parsedDate.format('MM/DD/YYYY hh:mm A');
  }

  return (
    <StyledBox className={className} padding="large" snap={snap} noBorderRadius={noBorderRadius}>
      <StyledIcon icon={icon} palette="grey" />
      <SeconColumn>
        <StyledColumn>
          <StyledBlock size="caption">{title}</StyledBlock>
          <Block size="caption" palette="grey">
            {description}
            {onEditClick && <CursorSpan palette="primary" size="caption" onClick={onEditClick}> Edit note</CursorSpan>}
          </Block>
        </StyledColumn>
        <Date size="caption" palette="grey">{dateString}</Date>
      </SeconColumn>
    </StyledBox>
  );
};

FamilyActivityItem.propTypes = {
  title: string.isRequired,
  description: string,
  icon: string,
  date: string.isRequired,
  snap: string,
  noBorderRadius: bool,
  className: string,
  onEditClick: func,
};

FamilyActivityItem.defaultProps = {
  icon: 'logo',
};

export default FamilyActivityItem;
