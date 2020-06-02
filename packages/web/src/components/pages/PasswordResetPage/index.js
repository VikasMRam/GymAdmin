import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import pad from 'sly/web/components/helpers/pad';
import { Heading, Block, Button, Box } from 'sly/web/components/atoms';
import TosAndPrivacy from 'sly/web/components/molecules/TosAndPrivacy';
import IconButton from 'sly/web/components/molecules/IconButton';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import { TemplateHeader } from 'sly/web/components/templates/BasePageTemplate';
import Footer from 'sly/web/components/organisms/Footer';
import { textAlign } from 'sly/web/components/helpers/text';

const FullWidthButton = fullWidth(Button);

const PaddedFullWidthButton = pad(FullWidthButton, 'large');
PaddedFullWidthButton.displayName = 'PaddedFullWidthButton';

const PaddedTemplateHeader = pad(TemplateHeader);

const Body = fullWidth(pad(styled.div`
  margin: auto;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col6')};
  }
`));

const CenteredPaddedHeading = textAlign(pad(Heading));
CenteredPaddedHeading.displayName = 'CenteredPaddedHeading';

const CenteredTosAndPrivacy = textAlign(TosAndPrivacy);

const PaddedBlock = pad(Block, 'large');
PaddedBlock.displayName = 'PaddedBlock';

const StyledIconButton = styled(pad(IconButton, 'large'))`
  float: right;
`;

const StyledForm = styled.form`
  clear: both;
`;

const PasswordResetPage = ({ handleSubmit, submitting, error, invalid, onClose }) => (
  <>
    <PaddedTemplateHeader><HeaderContainer /></PaddedTemplateHeader>
    <Body>
      <Box>
        <StyledIconButton
          icon="close"
          iconSize="regular"
          palette="slate"
          onClick={onClose}
          transparent
        />
        <StyledForm onSubmit={handleSubmit}>
          <CenteredPaddedHeading size="subtitle">Create new password</CenteredPaddedHeading>
          <Field
            name="password"
            label="New Password"
            type="password"
            component={ReduxField}
          />
          <PaddedFullWidthButton type="submit" disabled={submitting || invalid}>Save password</PaddedFullWidthButton>
          {error && <PaddedBlock palette="danger">{error}</PaddedBlock>}
        </StyledForm>
        <CenteredTosAndPrivacy />
      </Box>
    </Body>
    <Footer />
  </>
);

PasswordResetPage.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  error: string,
  onClose: func,
};

export default PasswordResetPage;
