import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { getKey, size } from 'sly/components/themes';
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
  height: auto;
  margin-bottom: 0;
`;

const SmallScreenButton = displayOnlyIn(IconButton, ['mobile']);
SmallScreenButton.displayName = 'SmallScreenButton';

const BigScreenButton = displayOnlyIn(Button, ['tablet', 'laptop']);
BigScreenButton.displayName = 'BigScreenButton';

const minHeight = parseFloat(getKey('sizes.element.button')) * 16;

const getMinMax = (height, min, max) => {
  switch (true) {
    case height < min: return min;
    case height > max: return max;
    default: return height;
  }
};

export default class SendMessageForm extends React.Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    error: string,
    className: string,
    placeholder: string,
    submitting: bool,
    pristine: bool,
    invalid: bool,
    disabled: bool,
  };

  formRef = React.createRef();

  onChange = ({ target }) => {
    target.style.height = 'auto';
    const contentHeight = target.scrollHeight;
    const formHeight = this.formRef.current.offsetHeight;
    const messagesHeight = this.formRef.current.previousSibling.offsetHeight;
    const totalHeight = formHeight + messagesHeight;
    const maxHeight = (totalHeight / 2) - 48;
    const height = getMinMax(contentHeight, minHeight, maxHeight);

    console.log({ contentHeight, minHeight, maxHeight, totalHeight, formHeight, messagesHeight })

    target.style.height = `${height}px`;
  };

  render() {
    const {
      error,
      placeholder,
      className,
      handleSubmit,
      pristine,
      submitting,
      invalid,
      disabled,
    } = this.props;

    return (
      <form ref={this.formRef} onSubmit={handleSubmit} className={className}>
        <TwoColumWrapper>
          <StyledField
            fieldRef={this.fieldRef}
            onChange={this.onChange}
            type="textarea"
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
  }
}

