import React from 'react';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { ifProp } from 'styled-tools';

import ReduxField from 'sly/common/components/organisms/ReduxField';
import { Close } from 'sly/common/icons';
import { Flex, Heading, Button, space, Block, Hr, sx } from 'sly/common/system';


const StyledButton = styled(Button)`
  margin-top:${space('m')};
  margin-bottom: ${ifProp('error', space('m'), 0)};
  width: 100%;
`;
StyledButton.displayName = 'StyledButton';

const ShareListingForm = ({
  submitting, fromEnabled, handleSubmit, error, onCancelClick,
}) => (
  <section>
    <Flex pad="l"><Heading font="title-m">Share this listing</Heading> <Close onClick={onCancelClick} ml="auto" /> </Flex>
    <Hr  pad="l" marginX={sx`-${space('l')}`} />
    <form onSubmit={handleSubmit}>
      <Field
        type="text"
        name="to"
        label="Send to"
        placeholder="Enter email addresses, separated by commas"
        component={ReduxField}
      />
      {fromEnabled &&
        <Field
          type="text"
          name="from"
          label="From"
          placeholder="Your email"
          component={ReduxField}
        />
      }
      <Field
        type="textarea"
        rows="3"
        name="message"
        label="Message"
        placeholder="I wanted to share this listing with you..."
        component={ReduxField}
      />
      <StyledButton error={error} type="submit" disabled={submitting}>
        Send Email
      </StyledButton>
    </form>
    {error && <Block color="danger">{error}</Block>}
  </section>
);

ShareListingForm.propTypes = {
  handleSubmit: func.isRequired,
  fromEnabled: bool,
  submitting: bool,
  error: string,
  onCancelClick: func.isRequired,
};

ShareListingForm.defaultProps = {
  fromEnabled: true,
};

export default ShareListingForm;
