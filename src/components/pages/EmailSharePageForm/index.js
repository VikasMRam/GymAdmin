import React from 'react';
import { func, object, string, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import Button from 'sly/components/atoms/Button';
import ReduxField from 'sly/components/organisms/ReduxField';
import userPropType from 'sly/propTypes/user';
import { palette, size } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import { Block } from 'sly/components/atoms';

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%; 
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  background: ${palette('primary.background')};
`;

const Form = styled.form`
  background: white;
  border: 1px solid ${palette('slate.stroke')};
  border-radius: ${size('spacing.small')};
  
  margin: ${size('spacing.large')};
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col6')}; 
  }
`;

const FormScrollSection = styled.div`
  max-height: calc(100vh - 160px);
  overflow-y: auto;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    max-height: calc(100vh - 230px);
  }
`;

const FormSection = styled.div`
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
  padding-bottom: 0;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xLarge')};
    padding-bottom: 0;
  }
`;

const FormBottomSection = styled.div`
  border-top: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  padding: ${size('spacing.xLarge')};
  text-align: right;
`;

const FormSectionHeading = pad(Block, 'large');

const StyledButton = pad(Button, 'regular');

export default function EmailSharePageForm({ formName, email, invalid, submitting, handleSubmit }) {
  return (
    <Wrapper>
      <Form name={formName} onSubmit={handleSubmit}>
        <FormScrollSection>
          <FormSection>
            <FormSectionHeading weight="medium">{email.subject}</FormSectionHeading>
            <Field type="text" name="to.name" label="Your friend's name" component={ReduxField} />
            <Field type="email" name="to.email" label="Your friend's email address" component={ReduxField} />
            <Field type="text" name="from.name" label="Your name" component={ReduxField} />
            <Field type="email" name="from.email" label="Your email address" component={ReduxField} />
          </FormSection>
        </FormScrollSection>
        <FormBottomSection>
          <StyledButton type="submit" disabled={invalid || submitting}>
            Send
          </StyledButton>
        </FormBottomSection>
      </Form>
    </Wrapper>
  );
}

EmailSharePageForm.propTypes = {
  user: userPropType,
  formName: string.isRequired,
  submitting: bool,
  invalid: bool,
  email: object,
  handleSubmit: func.isRequired,
};

