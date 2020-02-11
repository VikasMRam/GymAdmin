import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import styled from 'styled-components';

import { size, palette, columnWidth } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { Block, Button } from 'sly/components/atoms';
import { Field } from 'redux-form';
import ReduxField from 'sly/components/organisms/ReduxField';
import { phoneFormatter, phoneParser } from 'sly/services/helpers/phone';

const StyledButton = pad(Button, 'regular');
StyledButton.displayName = 'StyledButton';

const Form = styled.form``;
Form.displayName = 'Form';

const Warning = pad(styled(Block)`
  background-color: ${palette('warning.filler')};
  border-radius: ${size('border.xxLarge')};
  text-align: center;
  padding: ${size('spacing.large')};
`, 'xLarge');
Warning.displayName = 'Warning';

const FormScrollSection = styled.div`
  max-height: calc(100vh - 240px);
  overflow-y: auto;
`;

const IntroInfo = textAlign(styled(Block)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('tabletLayout.gutter')};
    flex: 0 0 ${columnWidth(3, size('layout.gutter'))};
  }
`, 'left');
IntroInfo.displayName = 'IntroInfo';

const FormSection = styled.div`
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
  padding-bottom: 0;
  border-bottom: ${size('border.regular')} solid ${palette('slate', 'stroke')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xLarge')};
    padding-bottom: 0;
  }
`;

const FormBottomSection = styled.div`
  margin-top: ${size('spacing.xLarge')};
`;

const FormSectionHeading = pad(Block, 'large');


// const contactPreferenceOptionsList = [{ value: 'sms', label: 'SMS' }, { value: 'email', label: 'Email' }, { value: 'phone', label: 'Phone' }];

export default class DashboardCommunityDetailsForm extends Component {
  static propTypes = {
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    handleSubmit: func.isRequired,
  };

  render() {
    const {
      handleSubmit, invalid, submitting, canEdit,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <FormScrollSection>
          <FormSection>
            <FormSectionHeading weight="medium">Metadata</FormSectionHeading>
            <Field
              name="name"
              label="Contact name"
              type="text"
              readOnly={!canEdit}
              component={ReduxField}
              wideWidth
            />
            <Field
              name="propInfo.communityPhone"
              label="Front desk phone number"
              type="text"
              placeholder="925-555-5555"
              parse={phoneParser}
              format={phone => phoneFormatter(phone)}
              component={ReduxField}
              wideWidth
            />
          </FormSection>
        </FormScrollSection>
        {canEdit &&
          <FormBottomSection>
            <StyledButton type="submit" disabled={invalid || submitting}>
              Save changes
            </StyledButton>
          </FormBottomSection>
        }
      </Form>
    );
  }
}

