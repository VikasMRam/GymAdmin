import React from 'react';
import { func, bool, number, string, shape, arrayOf } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';

import { Heading, Button, Block, Tag } from 'sly/components/atoms';

const makeTags = tags => tags.map(tag => <Tag>{tag}</Tag>);

const makeOptions = communities => communities
  .map(community => ({
    value: community.id,
    label: community.name,
    community,
  }));

const Form = styled.form`
  width: 100%;
`;

const Tags = styled.div`
  margin-top: ${size('spacing.large')};
  margin-bottom: ${size('spacing.xLarge')};
  > * {
    margin-right: ${size('spacing.regular')};
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.regular')};
`;

const SimilarCommunitiesForm = ({ handleSubmit, submitting, community }) => (
  <Form onSubmit={handleSubmit}>
    <StyledHeading>
      Send your message to similar communities
    </StyledHeading>
    <Block>
      We found that these communities have similar features that you are looking for.
    </Block>
    <Tags>
      {makeTags(community.propInfo.typeCare)}
    </Tags>
    <Field
      name="similar_communities"
      type="communitychoice"
      options={makeOptions(community.similarProperties)}
      component={ReduxField}
    />
    <StyledButton type="submit" disabled={submitting}>
      Send Message
    </StyledButton>
  </Form>
);

SimilarCommunitiesForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  community: shape({
    similarProperties: arrayOf(shape({ id: string.isRequired, name: string.isRequired, rating: number })).isRequired,
    propInfo: shape({
      typeCare: arrayOf(string),
    }).isRequired,
  }).isRequired,
  tags: arrayOf(string).isRequired,
};

export default SimilarCommunitiesForm;

