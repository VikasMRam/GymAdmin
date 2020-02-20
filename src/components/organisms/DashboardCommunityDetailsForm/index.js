import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import styled from 'styled-components';

import { size, palette, columnWidth } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { Block, Button } from 'sly/components/atoms';
import { Field } from 'redux-form';
import ReduxField from 'sly/components/organisms/ReduxField';
import { AVAILABLE_TAGS } from 'sly/constants/tags';


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
              label="Community name"
              type="text"
              readOnly={!canEdit}
              component={ReduxField}
              wideWidth
            />
            <Field
              name="propInfo.communityPhone"
              label="Front desk phone number"
              type="phone"
              readOnly={!canEdit}
              placeholder="(925) 555-5555"
              parens
              component={ReduxField}
              wideWidth
            />
            <Field
              name="propInfo.ownerName"
              label="Owner name"
              type="text"
              readOnly={!canEdit}
              placeholder="John Doe"
              component={ReduxField}
              wideWidth
            />
            <Field
              name="propInfo.ownerEmail"
              label="Owner email"
              type="email"
              readOnly={!canEdit}
              placeholder="john@community.com"
              component={ReduxField}
              wideWidth
            />
            <Field
              name="propInfo.typeCare"
              label="Care type"
              type="choice"
              readOnly={!canEdit}
              isMulti
              options={AVAILABLE_TAGS.map(value => ({ label: value, value }))}
              component={ReduxField}
              wideWidth
            />
          </FormSection>
          <FormSection>
            <FormSectionHeading weight="medium">Respite care</FormSectionHeading>
            <Field
              name="propInfo.respiteAllowed.checked"
              type="boolean"
              readOnly={!canEdit}
              options={[{ value: true, label: 'Respite care allowed' }]}
              component={ReduxField}
            />
            <Field
              name="propInfo.respiteAllowed.minlength"
              label="Minimum stay length"
              type="number"
              readOnly={!canEdit}
              component={ReduxField}
              wideWidth
              parse={value => !value ? null : Number(value)}
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

