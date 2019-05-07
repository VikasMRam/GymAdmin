import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Block } from 'sly/components/atoms';
import IconButton from 'sly/components/molecules/IconButton';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';

const StyledIconButton = styled(IconButton)`
  margin-right: ${size('spacing.regular')};
`;

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const AcceptAndContactFamilyForm = ({
  onCallClick, onEmailClick, onCancelClick,
}) => (
  <ThreeSectionFormTemplate hasCancel heading="Accept and contact this family" onCancelClick={onCancelClick}>
    <StyledBlock size="caption">Select how you would like to reach this family:</StyledBlock>
    {onCallClick && <StyledIconButton icon="phone" ghost transparent onClick={onCallClick}>Call</StyledIconButton>}
    {onEmailClick && <IconButton icon="email" ghost transparent onClick={onEmailClick}>Email</IconButton>}
    {!onCallClick && !onEmailClick && <Block size="caption">No contact info available!</Block>}
  </ThreeSectionFormTemplate>
);

AcceptAndContactFamilyForm.propTypes = {
  onCallClick: func,
  onEmailClick: func,
  onCancelClick: func,
};

export default AcceptAndContactFamilyForm;
