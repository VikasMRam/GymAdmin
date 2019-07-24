import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Block, Button } from 'sly/components/atoms';
import displayOnlyIn from 'sly/components/helpers/displayOnlyIn';
import IconButton from 'sly/components/molecules/IconButton';
import ReduxField from 'sly/components/organisms/ReduxField';

const TwoColumWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-column-gap: ${size('spacing.large')};
  margin-bottom: ${size('spacing.regular')};
`;

const StyledField = styled(Field)`
  margin-bottom: 0;
`;

const SmallScreenButton = displayOnlyIn(IconButton, ['mobile']);
SmallScreenButton.displayName = 'SmallScreenButton';

const BigScreenButton = displayOnlyIn(Button, ['tablet', 'laptop']);
BigScreenButton.displayName = 'BigScreenButton';

const SendMessageForm = ({
  error, placeholder, className, handleSubmit, pristine, submitting, invalid, disabled,
}) => (
  <form onSubmit={handleSubmit} className={className}>
    <TwoColumWrapper>
      <StyledField
        type="text"
        name="message"
        placeholder={placeholder}
        component={ReduxField}
        hideErrors
        disabled={disabled}
      />
      <BigScreenButton type="submit" disabled={invalid || pristine || submitting}>Send message</BigScreenButton>
      <SmallScreenButton type="submit" icon="send" disabled={invalid || pristine || submitting} />
    </TwoColumWrapper>
    {error && <Block palette="danger" size="caption">{error}</Block>}
  </form>
);

SendMessageForm.propTypes = {
  handleSubmit: func.isRequired,
  error: string,
  className: string,
  placeholder: string,
  submitting: bool,
  pristine: bool,
  invalid: bool,
  disabled: bool,
};

export default SendMessageForm;
