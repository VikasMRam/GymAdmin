import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import dayjs from 'dayjs';

import pad from 'sly/components/helpers/pad';
import { size } from 'sly/components/themes';
import { Box, Block, Icon } from 'sly/components/atoms';

const StyledBox = styled(Box)`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const StyledBlock = pad(Block, 'regular');
StyledBlock.displayName = 'StyledBlock';

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.xLarge')};
`;

const StyledColumn = styled.div`
  margin-right: ${size('spacing.huge')};
`;

const FamilyActivityItem = ({
  title, description, icon, date,
}) => {
  let dateString = '';
  const parsedDate = dayjs(date);
  if (!parsedDate.isValid()) {
    dateString = 'Failed to parse date';
  } else {
    dateString = parsedDate.format('MM/DD/YYYY hh:mm A');
  }

  return (
    <StyledBox padding="large">
      <StyledIcon icon={icon} palette="grey" />
      <StyledColumn>
        <StyledBlock size="caption">{title}</StyledBlock>
        <Block size="caption" palette="grey">{description}</Block>
      </StyledColumn>
      <Block size="caption" palette="grey">{dateString}</Block>
    </StyledBox>
  );
};

FamilyActivityItem.propTypes = {
  title: string.isRequired,
  description: string,
  icon: string,
  date: string.isRequired,
};

FamilyActivityItem.defaultProps = {
  icon: 'seniorly',
};

export default FamilyActivityItem;
