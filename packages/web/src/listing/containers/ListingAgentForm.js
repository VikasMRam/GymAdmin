import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { ifProp } from 'styled-tools';

import { size } from 'sly/common/components/themes';
import userPropType from 'sly/common/propTypes/user';
import { phoneParser, phoneFormatter } from 'sly/web/services/helpers/phone';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import { Heading, Block, color, font, Button } from 'sly/common/system';


const StyledDesc = styled.div`
margin-bottom: ${size('spacing.xLarge')};
color:${color('viridian.darker-20')};
font : ${font('body-m')}
`;

const StyledButton = styled(fullWidth(Button))`
  margin-top: ${size('spacing.regular')};
  margin-bottom: ${ifProp('hasMarginBottom', size('spacing.large'), 0)};
`;


const FieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 48%;
  grid-gap: ${size('spacing.regular')};
`;


export default class ListingAgentForm extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    invalid: bool,
    submitting: bool,
    error: string,
    change: func,
    heading: string.isRequired,
    description: string,
    user: userPropType,
    hasEmail: bool,
    hideMessage: bool,
    buttonKind: string,
    messagePlaceholder: string,
    handleSendMessage: func.isRequired,
    sendMessageProgress: bool.isRequired,
    handleBookTour: func.isRequired,
    bookTourProgress: bool,
    messageLabel: string,
    phoneNumber: 'string',
    isSidebar: bool,
  };

  static defaultProps = {
    heading: 'Talk to a Seniorly Local Advisor',
    agentFirstName: 'we',
    messagePrompt: '',
    buttonKind: 'jumbo',
    messagePlaceholder: 'Type your question here. ',
    hideMessage: false,
    isSidebar: false,
  };

  render() {
    const {
      invalid, handleSendMessage, sendMessageProgress, handleBookTour, error, heading, description, user, hasEmail, buttonKind,
      messageLabel, messagePlaceholder, handleSubmit, phoneNumber, isSidebar } = this.props;
    const showPhoneNumber = phoneNumber !== '';

    return (
      <section>
        <Heading pad="l" font="title-s" mb="0">{heading}</Heading>
        {showPhoneNumber && <StyledDesc>{phoneNumber}</StyledDesc>}
        <form>
          {!(user && user.name) &&
          <FieldsWrapper>
            <Field
              name="firstName"
              label="First Name"
              type="text"
              component={ReduxField}
            />
            <Field
              name="lastName"
              label="Last Name"
              type="text"
              component={ReduxField}
            />
          </FieldsWrapper>

          }
          {!(user && user.phoneNumber) &&
          <Field
            name="phone"
            label="Phone"
            type="text"
            parse={phoneParser}
            format={phoneFormatter}
            component={ReduxField}
            required
          />
          }
          {!(user && user.email) && hasEmail &&
            <Field
              name="email"
              label="Email"
              type="email"
              component={ReduxField}
              required
            />
          }
          <Field
            type="textarea"
            rows="3"
            name="message"
            label={messageLabel}
            placeholder={messagePlaceholder}
            component={ReduxField}
            required
          />
          <StyledButton
            hasMarginBottom={error}
            kind={buttonKind}
            disabled={sendMessageProgress}
            onClick={handleSubmit(values =>
          handleSendMessage({
            ...values,

          }))}
          >
            Send Message
          </StyledButton>
          <Block
            textAlign="center"
            display={isSidebar ? 'none' : 'block'}
          >
            or
          </Block>
          <StyledButton
            hasMarginBottom={error}
            variant="secondary"
            display={isSidebar ? 'none' : 'inline-block'}
            disabled={sendMessageProgress}
            onClick={handleSubmit(values =>
              handleBookTour({
            ...values,
          }))}
          >
            Book a tour
          </StyledButton>
        </form>
        {error && <Block color="danger">{error}</Block>}
      </section>
    );
  }
}
