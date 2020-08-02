import React from 'react';
import { string, func } from 'prop-types';

import { community as communityPropType } from 'sly/common/propTypes/community';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { Button, Heading, Box } from 'sly/web/components/atoms';

const StyledButton = fullWidth(Button);

const PaddedHeading = pad(Heading, 'large');

const onClickEvent = id => ({ action: 'click-seller-agent', category: 'SidebarCTA', label: id });

const GetSellerAgentInfo = ({ community: { id }, buttonTo, onClick }) => (
  <Box>
    <PaddedHeading level="title" size="subtitle">Is selling your home part of your senior living plan?</PaddedHeading>
    <div>We can connect you to the top seller agents.</div>
    <StyledButton to={buttonTo} onClick={onClick} event={onClickEvent(id)}>
      Request Info
    </StyledButton>
  </Box>
);

GetSellerAgentInfo.propTypes = {
  community: communityPropType,
  buttonTo: string,
  onClick: func,
};

export default GetSellerAgentInfo;
