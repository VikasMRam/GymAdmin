import React from 'react';
import { func, node, string, bool, arrayOf, shape } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { Heading, Hr, Button } from 'sly/components/atoms';

const StyledHeading = styled(Heading)`
  padding: 0 ${size('spacing.xLarge')};
  padding-top: ${size('spacing.xLarge')};
`;

const Wrapper = styled.div`
  padding: 0 ${size('spacing.xLarge')};
  padding-bottom: ${size('spacing.xLarge')};
`;

const Bottom = styled.div`
  padding: ${size('spacing.large')} ${size('spacing.xLarge')};
  background: ${palette('grey.background')};
  border-top: ${size('border.regular')} solid ${palette('grey.stroke')};
  display: flex;
  justify-content: space-between;
`;

const ActionButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: ${size('spacing.large')};
`;

const ThreeSectionFormTemplate = ({
  onCancelClick, submitButtonText, cancelButtonText, children, heading, hasCancel, hasSubmit, onSubmit,
  pristine, submitting, invalid, extraActionButtonsAfterSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <StyledHeading size="subtitle">{heading}</StyledHeading>
    <Hr />
    <Wrapper>
      {children}
    </Wrapper>
    <Bottom>
      {hasCancel && <Button secondary onClick={onCancelClick}>{cancelButtonText}</Button>}
      {!hasCancel && <div />}
      <ActionButtonsWrapper>
        {hasSubmit && <Button ghost={extraActionButtonsAfterSubmit.length > 0} type="submit" disabled={invalid || pristine || submitting}>{submitButtonText}</Button>}
        {extraActionButtonsAfterSubmit.map(b => <Button disabled={submitting} onClick={b.onClick}>{b.text}</Button>)}
      </ActionButtonsWrapper>
    </Bottom>
  </form>
);

ThreeSectionFormTemplate.propTypes = {
  onCancelClick: func,
  children: node,
  heading: string,
  hasCancel: bool,
  hasSubmit: bool,
  submitButtonText: string.isRequired,
  cancelButtonText: string.isRequired,
  onSubmit: func,
  pristine: bool,
  submitting: bool,
  invalid: bool,
  extraActionButtonsAfterSubmit: arrayOf(shape({
    onClick: func,
    text: string.isRequired,
  })),
};

ThreeSectionFormTemplate.defaultProps = {
  submitButtonText: 'Submit',
  cancelButtonText: 'Cancel',
  extraActionButtonsAfterSubmit: [],
};

export default ThreeSectionFormTemplate;
