import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Wrapper } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box, Icon, Form, Block } from 'sly/common/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const Intro = ({
  handleSubmit, showSkipOption, skipOptionText,
}) => (
  <Wrapper>
    <Box>
      <Form onSubmit={handleSubmit}>
        <Block align="center" display="flex" direction="column">
          <Icon icon="logo" palette="primary" size="superHero" pad="xLarge" />
          <Heading level="subtitle" weight="medium" pad="xLarge" align="center">
            Complete this 3-minute assessment tool to get personalized senior living and care options.
          </Heading>
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
  handleSubmit: func.isRequired,
  showSkipOption: bool,
  skipOptionText: string.isRequired,
};

Intro.defaultProps = {
  skipOptionText: 'Skip',
};

export default Intro;
