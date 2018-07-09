import React from 'react';
import { Field } from 'redux-form';
import { string } from 'prop-types';
import styled from 'styled-components';
import { font, palette } from 'styled-theme';
import { ifProp, prop } from 'styled-tools';

import { size } from 'sly/components/themes';

import { Box } from 'sly/components/atoms';
import HelpBubble from 'sly/components/molecules/HelpBubble';
import ReduxField from 'sly/components/organisms/ReduxField';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0;
`;
const StyledField = styled(Field)`
  width: 100%;
  margin: 0;

  input {
    display: none!important;
  }

  label {
    margin: 0;
    cursor: pointer;
  }
`;

const BoxRadioButton = ({ name, ...props }) => (
  <Box padding="regular">
    <Wrapper>
      <StyledField
        {...props}
        name={name}
        type="radio"
        component={ReduxField}
      />
      <HelpBubble text="help text here" />
    </Wrapper>
  </Box>
);

BoxRadioButton.propTypes = {
  name: string,
};

export default BoxRadioButton;
