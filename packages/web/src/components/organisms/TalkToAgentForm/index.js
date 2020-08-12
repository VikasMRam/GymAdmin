import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { ifProp } from 'styled-tools';

import { size } from 'sly/common/components/themes';
import userPropType from 'sly/common/propTypes/user';
import { phoneParser, phoneFormatter } from 'sly/web/services/helpers/phone';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { Button, Block, Heading, ResponsiveImage } from 'sly/web/components/atoms';
import TosAndPrivacy from 'sly/web/components/molecules/TosAndPrivacy';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import { textAlign } from 'sly/web/components/helpers/text';

const StyledHeading = textAlign(pad(Heading));

const CenteredTosAndPrivacy = textAlign(TosAndPrivacy);

const StyledDesc = styled.div`
margin-top: ${size('spacing.regular')};
margin-bottom: ${size('spacing.regular')};
`;

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

const FieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 48%;
  grid-gap: ${size('spacing.regular')};
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
    description: string,
    user: userPropType,
    hasLocation: bool,
    image: string,
    hasEmail: bool,
    agentFirstName: string.isRequired,
    messagePrompt: string,
    showMessageFieldFirst: bool,
    hideMessage: bool,
    buttonKind: string,
    messagePlaceholder: string,
  };

  static defaultProps = {
    heading: 'Talk to a local senior living expert',
    agentFirstName: 'we',
    messagePrompt: '',
    buttonKind: 'jumbo',
    messagePlaceholder: 'Type your question here. ',
    hideMessage: false,
  };

  render() {
    const {
      invalid, submitting, handleSubmit, error, heading, description, user, hasLocation, hasEmail,
      agentFirstName, messagePrompt, showMessageFieldFirst, hideMessage, image, buttonKind, messagePlaceholder,
    } = this.props;
    const messageLabel = (messagePrompt === '') ? `What can ${agentFirstName} help you with?` : messagePrompt;
    const showDesc = description !== '' ;
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
        {showDesc && <StyledDesc>{description}</StyledDesc>}
        <form onSubmit={handleSubmit}>
          {showMessageFieldFirst && !hideMessage && messageField}
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
          {!showMessageFieldFirst && !hideMessage && messageField}
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
