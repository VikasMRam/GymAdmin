import React from 'react';
import styled from 'styled-components';

import clientPropType from 'sly/propTypes/client';
import { STATUS_PALETTE_MAP, STATUS_ICON_MAP } from 'sly/constants/familyDetails';
import { Box, Block } from 'sly/components/atoms';
import Stage from 'sly/components/molecules/Stage';
import IconBadge from 'sly/components/molecules/IconBadge';

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const FamilyEntry = ({ client }) => (
  <div>
    <StyledBox padding="large">
      <Block palette="primary" weight="medium">{client.clientInfo.name}</Block>
      <IconBadge palette={STATUS_PALETTE_MAP[client.status]} icon={STATUS_ICON_MAP[client.status]} text={client.status} />
    </StyledBox>
    <Box padding="large" snap="top">
      <Stage stage={client.stage} />
    </Box>
  </div>
);

FamilyEntry.propTypes = {
  client: clientPropType.isRequired,
};

export default FamilyEntry;
