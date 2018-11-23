import React from 'react';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';

import { size } from 'sly/components/themes';
import { Heading, Image, Button } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  height: ${size('carousel.mobile')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: unset;
    max-width: 40%;
  }
`;
StyledImage.displayName = 'StyledImage';

const ContentWrapper = styled.div`
  padding: ${size('spacing.xxLarge')};
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const SaveCommunityForm = ({ mainImage, submitting, handleSubmit }) => (
  <Wrapper>
    {mainImage && <StyledImage src={mainImage} />}
    <ContentWrapper>
      <StyledHeading size="subtitle">Add to your favorites list</StyledHeading>
      <form onSubmit={handleSubmit}>
        <Field
          type="textarea"
          rows="3"
          name="note"
          label="Add a note"
          placeholder="What are some things about this community that you like..."
          component={ReduxField}
        />
        <StyledButton type="submit" kind="jumbo" disabled={submitting}>
          Confirm
        </StyledButton>
      </form>
    </ContentWrapper>
  </Wrapper>
);

SaveCommunityForm.propTypes = {
  mainImage: string,
  handleSubmit: func.isRequired,
  submitting: bool,
};

export default SaveCommunityForm;
