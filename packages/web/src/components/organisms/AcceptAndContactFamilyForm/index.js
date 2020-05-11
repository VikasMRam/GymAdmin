import React from 'react';
import { func, arrayOf, oneOf } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';

import { size } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import { Block } from 'sly/components/atoms';
import IconButton from 'sly/components/molecules/IconButton';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';
import ReduxField from 'sly/components/organisms/ReduxField';

const StyledIconButton = styled(IconButton)`
  margin-right: ${size('spacing.regular')};
`;

const PaddedBlock = pad(Block, 'regular');

const AcceptAndContactFamilyForm = ({ handleSubmit, contactTypes, change, onCancelClick }) => (
  <ThreeSectionFormTemplate hasCancel heading="Accept and contact this family" onSubmit={handleSubmit} onCancelClick={onCancelClick}>
    <PaddedBlock size="caption">Select how you would like to reach this family:</PaddedBlock>
    <Field
      name="contactType"
      type="hidden"
      component={ReduxField}
    />
    {contactTypes.includes('phone') &&
      <StyledIconButton
        icon="phone"
        type="submit"
        ghost
        transparent
        onClick={() => change('contactType', 'phone')}
      >
        Call
      </StyledIconButton>
    }
    {contactTypes.includes('email') &&
      <StyledIconButton
        icon="email"
        type="submit"
        ghost
        transparent
        onClick={() => change('contactType', 'email')}
      >
        Email
      </StyledIconButton>
    }
    {contactTypes.includes('message') &&
      <StyledIconButton
        icon="message"
        type="submit"
        ghost
        transparent
        onClick={() => change('contactType', 'message')}
      >
        Message
      </StyledIconButton>
    }
    {contactTypes.length === 0 && <Block size="caption">No contact info available!</Block>}
  </ThreeSectionFormTemplate>
);

AcceptAndContactFamilyForm.propTypes = {
  handleSubmit: func.isRequired,
  change: func.isRequired,
  onCancelClick: func,
  contactTypes: arrayOf(oneOf(['phone', 'email', 'message'])),
};

AcceptAndContactFamilyForm.defaultProps = {
  change: _ => _,
  handleSubmit: _ => _,
  contactTypes: [],
};

export default AcceptAndContactFamilyForm;
