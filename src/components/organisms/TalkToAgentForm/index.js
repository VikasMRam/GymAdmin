import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import userPropType from 'sly/propTypes/user';
import { phoneParser, phoneFormatter } from 'sly/services/helpers/phone';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { Button, Block } from 'sly/components/atoms';
import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';
import ReduxField from 'sly/components/organisms/ReduxField';

const StyledBlock = textAlign(pad(Block));

const StyledButton = styled(Button)`
  margin-bottom: ${ifProp('hasMarginBottom', size('spacing.large'), 0)};
  width: 100%;
`;

export default class TalkToAgentForm extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    invalid: bool,
    submitting: bool,
    error: string,
    change: func,
    onLocationChange: func,
    heading: string.isRequired,
    user: userPropType,
    hasLocation: bool,
    hasEmail: bool,
    firstName: string.isRequired,
  };

  static defaultProps = {
    heading: 'Talk to a local Seniorly Agent',
    firstName: 'we',
  };

  render() {
    const {
      invalid, submitting, handleSubmit, error, heading, user, hasLocation, hasEmail,
      firstName,
    } = this.props;

    const showTos = !user;

    return (
      <section>
        <StyledBlock size="title" weight="medium">{heading}</StyledBlock>
        <form onSubmit={handleSubmit}>
          {hasLocation &&
            <Field
              name="location"
              label="Where are you searching for homes?"
              type="locationSearch"
              placeholder="Search By City, State"
              component={ReduxField}
              required
            />
          }
          {!(user && user.name) &&
            <Field
              name="name"
              label="Full Name"
              type="text"
              placeholder="Full Name"
              component={ReduxField}
              required
            />
          }
          {!(user && user.email) && hasEmail &&
            <Field
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              component={ReduxField}
              required
            />
          }
          {!(user && user.phoneNumber) &&
            <Field
              name="phone"
              label="Phone"
              type="text"
              parse={phoneParser}
              format={phoneFormatter}
              placeholder="925-555-5555"
              component={ReduxField}
              required
            />
          }
          <Field
            type="textarea"
            rows="3"
            name="message"
            label={`What can ${firstName} help you with?`}
            placeholder="I'm interested in a free consult with a Seniorly Agent."
            component={ReduxField}
            required
          />
          <StyledButton hasMarginBottom={error || showTos} type="submit" kind="jumbo" disabled={invalid || submitting}>
            Send
          </StyledButton>
          {showTos && <TosAndPrivacy />}
        </form>
        {error && <Block palette="danger">{error}</Block>}
      </section>
    );
  }
}
