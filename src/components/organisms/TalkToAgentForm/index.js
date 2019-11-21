import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import { phoneParser, phoneFormatter } from 'sly/services/helpers/phone';
import { Button, Block } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

const StyledBlock = styled(Block)`
  text-align: center;
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledButton = styled(Button)`
  margin-bottom: ${ifProp('error', size('spacing.large'), 0)};
  width: 100%;
`;

const StyledSearchBoxContainer = styled(SearchBoxContainer)`
  margin-bottom: ${size('spacing.large')};
`;

const Label = styled(Block)`
  margin-bottom: ${size('spacing.small')};
`;

const noRender = () => null;

class TalkToAgentForm extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    invalid: bool,
    submitting: bool,
    error: string,
    change: func,
    onLocationChange: func,
    heading: string,
  };

  static defaultProps = {
    heading: 'Talk to a local Seniorly Agent',
  };

  handleChange = () => {
    const { change } = this.props;
    change('location', null);
  };

  handleLocationChange = (value) => {
    const { change, onLocationChange } = this.props;
    change('location', value);
    if (onLocationChange) {
      onLocationChange(value);
    }
  };

  render() {
    const { handleChange, handleLocationChange } = this;
    const {
      invalid, submitting, handleSubmit, error, heading,
    } = this.props;

    return (
      <section>
        <StyledBlock size="title" weight="medium">{heading}</StyledBlock>
        <form onSubmit={handleSubmit}>
          <Label size="caption">Where are you searching for homes? *</Label>
          <StyledSearchBoxContainer
            clearLocationOnBlur={false}
            onLocationSearch={handleLocationChange}
            onTextChange={handleChange}
          />
          <Field name="location" component={noRender} />
          <Field
            name="name"
            label="Full Name *"
            type="text"
            placeholder="Full Name"
            component={ReduxField}
          />
          <Field
            name="phone"
            label="Phone *"
            type="text"
            parse={phoneParser}
            format={phoneFormatter}
            placeholder="925-555-5555"
            component={ReduxField}
          />
          <Field
            type="textarea"
            rows="3"
            name="message"
            label="What can we help you with? *"
            placeholder="I'm interested in a free consult with a Seniorly Agent."
            component={ReduxField}
          />
          <StyledButton error={error} type="submit" kind="jumbo" disabled={invalid || submitting}>
            Send
          </StyledButton>
        </form>
        {error && <Block palette="danger">{error}</Block>}
      </section>
    );
  }
}

export default TalkToAgentForm;
