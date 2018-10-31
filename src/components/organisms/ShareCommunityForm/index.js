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

const ShareCommunityForm = ({
  mainImage, submitting, fromEnabled, handleSubmit,
}) => (
  <Wrapper>
    {mainImage && <StyledImage src={mainImage} />}
    <ContentWrapper>
      <StyledHeading size="subtitle">Share this community</StyledHeading>
      <form onSubmit={handleSubmit}>
        <Field
          type="text"
          name="to"
          label="Send to"
          placeholder="Enter email addresses, separated by commas"
          component={ReduxField}
        />
        {fromEnabled &&
          <Field
            type="text"
            name="from"
            label="From"
            placeholder="Your email"
            component={ReduxField}
          />
        }
        <Field
          type="textarea"
          rows="3"
          name="message"
          label="Message"
          placeholder="I wanted to share this community with you..."
          component={ReduxField}
        />
        <Button type="submit" kind="jumbo" disabled={submitting}>
          Send
        </Button>
      </form>
    </ContentWrapper>
  </Wrapper>
);

ShareCommunityForm.propTypes = {
  mainImage: string,
  handleSubmit: func.isRequired,
  fromEnabled: bool,
  submitting: bool,
};

ShareCommunityForm.defaultProps = {
  fromEnabled: true,
};

export default ShareCommunityForm;
