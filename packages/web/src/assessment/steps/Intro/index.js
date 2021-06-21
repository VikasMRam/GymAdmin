import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { PageWrapper, Wrapper } from 'sly/web/assessment/Template';
import { Heading, Form, Block } from 'sly/common/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const Intro = ({
  title, description, startButtonText, handleSubmit, showSkipOption, skipOptionText,
}) => (
  <PageWrapper>
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Block align="center" display="flex" direction="column">
          <Heading level="subtitle" weight="medium" pad="xLarge" align="center">
            {title}
          </Heading>
          {description !== '' && <Block pad="xLarge">{description}</Block>}
        </Block>
        <Field
          name="whatToDoNext"
          type="button"
          buttonType="submit"
          component={ReduxField}
          inputValue="start"
          pad={showSkipOption ? undefined : '0'}
        >
          {startButtonText}
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
            noBorder
          >
            {skipOptionText}
          </Field>
        }
      </Form>
    </Wrapper>
  </PageWrapper>
);

Intro.propTypes = {
  title: string,
  description: string,
  startButtonText: string,
  handleSubmit: func.isRequired,
  showSkipOption: bool,
  skipOptionText: string.isRequired,
};

Intro.defaultProps = {
  skipOptionText: 'Skip',
};

export default Intro;