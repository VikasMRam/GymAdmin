import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Wrapper } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box, Form, Block } from 'sly/common/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const Intro = ({
  title, description, handleSubmit, showSkipOption, skipOptionText,
}) => (
  <Wrapper>
    <Box>
      <Form onSubmit={handleSubmit}>
        <Block align="center" display="flex" direction="column">
          <Heading level="subtitle" weight="medium" pad="xLarge" align="center">
            {title}
          </Heading>
          {description !== '' && <Block>{description}</Block>}
        </Block>
        <Field
          name="whatToDoNext"
          type="button"
          buttonType="submit"
          component={ReduxField}
          inputValue="start"
          pad={showSkipOption ? undefined : '0'}
        >
          Start
        </Field>
        {showSkipOption &&
          <Field
            name="whatToDoNext"
            type="button"
            buttonType="submit"
            component={ReduxField}
            inputValue="no-thanks"
            pad="0"
            ghost
          >
            {skipOptionText}
          </Field>
        }
      </Form>
    </Box>
  </Wrapper>
);

Intro.propTypes = {
  title: string,
  description: string,
  handleSubmit: func.isRequired,
  showSkipOption: bool,
  skipOptionText: string.isRequired,
};

Intro.defaultProps = {
  skipOptionText: 'Skip',
};

export default Intro;
