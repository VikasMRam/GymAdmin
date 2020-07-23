import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { getKey, size } from 'sly/common/components/themes';
import { Block, Button } from 'sly/web/components/atoms';
import displayOnlyIn from 'sly/web/components/helpers/displayOnlyIn';
import IconButton from 'sly/web/components/molecules/IconButton';
import ReduxField from 'sly/web/components/organisms/ReduxField';

const TwoColumWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-column-gap: ${size('spacing.large')};
  margin-bottom: ${size('spacing.regular')};
`;

const Textarea = styled(Field)`
  height: auto;
  margin-bottom: 0;
  textarea {
    height: ${size('element.button')};
    overflow: hidden;
    fonz-size: 14px;
    line-height: 1.5;
  }
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

  onKeyPress = (event) => {
    const { handleSubmit } = this.props;
    if (!event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  onChange = ({ target }, text) => {
    if (text === '') {
      target.style.height = null;
      target.style.overflow = null;
      return;
    }

    target.style.height = 'auto';
    target.style.overflow = 'auto';
    const contentHeight = target.scrollHeight + 2;
    const formHeight = this.formRef.current.offsetHeight;
    const messagesHeight = this.formRef.current.previousSibling.offsetHeight;
    const totalHeight = formHeight + messagesHeight;
    const maxHeight = (totalHeight / 2) - 48;
    const height = getMinMax(contentHeight, minHeight, maxHeight);

    if (contentHeight > maxHeight) {
      target.style.overflow = 'auto';
    }

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
          <Textarea
            onKeyDown={this.onKeyPress}
            onChange={this.onChange}
            type="textarea"
            name="message"
            placeholder={placeholder}
            component={ReduxField}
            hideErrors
            disabled={disabled}
          />
          <div>
            <BigScreenButton type="submit" disabled={invalid || pristine || submitting}>Send message</BigScreenButton>
            <SmallScreenButton type="submit" icon="send" disabled={invalid || pristine || submitting} />
          </div>
        </TwoColumWrapper>
        {error && <Block palette="danger" size="caption">{error}</Block>}
      </form>
    );
  }
}

