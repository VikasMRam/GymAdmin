import React from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';

import pad from 'sly/components/helpers/pad';
import fullWidth from 'sly/components/helpers/fullWidth';
import textAlign from 'sly/components/helpers/textAlign';
import { Heading, Block, Button } from 'sly/components/atoms';

const Wrapper = textAlign(styled.div``, 'center');

const StyledHeading = pad(Heading, 'large');
StyledHeading.displayName = 'StyledHeading';
const StyledBlock = pad(Block, 'xLarge');
StyledBlock.displayName = 'StyledBlock';
const StyledButton = fullWidth(Button);
StyledButton.displayName = 'StyledButton';
const ConfirmButon = pad(StyledButton, 'large');
ConfirmButon.displayName = 'ConfirmButon';

const ConfirmationDialog = ({
  heading, description, onConfirmClick, onCancelClick, confirmButtonText,
}) => (
  <Wrapper>
    <StyledHeading level="subtitle">{heading}</StyledHeading>
    {description && <StyledBlock palette="grey" size="caption">{description}</StyledBlock>}
    <ConfirmButon onClick={onConfirmClick}>{confirmButtonText}</ConfirmButon>
    <StyledButton secondary onClick={onCancelClick}>Cancel</StyledButton>
  </Wrapper>
);

ConfirmationDialog.propTypes = {
  heading: string.isRequired,
  description: string,
  confirmButtonText: string,
  onConfirmClick: func,
  onCancelClick: func,
};

ConfirmationDialog.defaultProps = {
  confirmButtonText: 'Confirm',
};

export default ConfirmationDialog;
