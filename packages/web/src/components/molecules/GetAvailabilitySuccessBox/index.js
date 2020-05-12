import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';

import { Icon, Block } from 'sly/web/components/atoms';
import { size } from 'sly/web/components/themes';

const Wrapper = styled.div`
  display: flex;

  > :first-child {
    margin-right: ${size('spacing.regular')};
  }
`;

const GetAvailabilitySuccessBox = ({ hasAllUserData }) => {
  let availabilityDoneText = 'Your Seniorly Guide will reach out to you regarding this community.';
  if (!hasAllUserData) {
    availabilityDoneText = 'We received your request, check your inbox shortly.';
  }

  return (
    <Wrapper>
      <Icon icon="round-checkmark" />
      <Block weight="bold">{availabilityDoneText}</Block>
    </Wrapper>
  );
};

GetAvailabilitySuccessBox.propTypes = {
  hasAllUserData: bool,
};

export default GetAvailabilitySuccessBox;
