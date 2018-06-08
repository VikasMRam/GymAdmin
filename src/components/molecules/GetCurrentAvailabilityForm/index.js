import React from 'react';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';

import { size } from 'sly/components/themes';
import { community as communityPropType } from 'sly/propTypes/community';

import { Box, Heading, Button } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const StyledBox = styled(Box)`
  margin-bottom: ${size('spacing.xLarge')};
  padding: ${size('spacing.xLarge')};
`;
const TwoColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
  }
`;
const StyledReduxField = styled(ReduxField)`
  margin-right: ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-bottom: 0;
  }
  width: 100%;
`;
const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;

const GetCurrentAvailabilityForm = ({
  community, handleSubmit, submitting,
}) => {
  const { name } = community;

  return (
    <StyledBox>
      <StyledHeading level="subtitle" size="subtitle">Get current availability at {name}</StyledHeading>
      <form onSubmit={handleSubmit}>
        <TwoColumnWrapper>
          <Field
            name="email"
            type="email"
            placeholder="Your email"
            component={StyledReduxField}
          />
          <Button type="submit" disabled={submitting}>Get Availability</Button>
        </TwoColumnWrapper>
      </form>
    </StyledBox>
  );
};

GetCurrentAvailabilityForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  community: communityPropType,
};

export default GetCurrentAvailabilityForm;
