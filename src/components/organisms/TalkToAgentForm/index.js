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
import fullWidth from 'sly/components/helpers/fullWidth';
import { Button, Block, Heading, ResponsiveImage } from 'sly/components/atoms';
import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';
import ReduxField from 'sly/components/organisms/ReduxField';

const StyledHeading = textAlign(pad(Heading));

const CenteredTosAndPrivacy = textAlign(TosAndPrivacy);

const StyledButton = styled(fullWidth(Button))`
  margin-bottom: ${ifProp('hasMarginBottom', size('spacing.large'), 0)};
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledResponsiveImage = pad(textAlign(styled(ResponsiveImage)`
  max-width: calc(${size('layout.col2')} + ${size('layout.gutter')});
`));

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
    image: string,
    hasEmail: bool,
    firstName: string.isRequired,
    messagePrompt: string,
    showMessageFieldFirst: bool,
    buttonKind: string,
    messagePlaceholder: string,
  };

  static defaultProps = {
    heading: 'Talk to a local Seniorly Agent',
    firstName: 'we',
    messagePrompt: '',
    buttonKind: 'jumbo',
    messagePlaceholder: 'Type your question here. NO JOB INQUIRIES'
  };

  render() {
    const {
      invalid, submitting, handleSubmit, error, heading, user, hasLocation, hasEmail,
      firstName, messagePrompt, showMessageFieldFirst, image, buttonKind, messagePlaceholder,
    } = this.props;
    const messageLabel = (messagePrompt === '') ? `What can ${firstName} help you with?` : messagePrompt;
    const showTos = !user;
    const messageField = (
      <Field
        type="textarea"
        rows="3"
        name="message"
        label={messageLabel}
        placeholder={messagePlaceholder}
        component={ReduxField}
        required
      />
    );

    return (
      <section>
        {image && <ImageWrapper><StyledResponsiveImage src={image} /></ImageWrapper>}
        <StyledHeading size="subtitle">{heading}</StyledHeading>
        <form onSubmit={handleSubmit}>
          {showMessageFieldFirst && messageField}
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
              label="Full name"
              type="text"
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
          {!showMessageFieldFirst && messageField}
          <StyledButton hasMarginBottom={error || showTos} type="submit" kind={buttonKind} disabled={invalid || submitting}>
            Send
          </StyledButton>
          {showTos && <CenteredTosAndPrivacy />}
        </form>
        {error && <Block palette="danger">{error}</Block>}
      </section>
    );
  }
}
