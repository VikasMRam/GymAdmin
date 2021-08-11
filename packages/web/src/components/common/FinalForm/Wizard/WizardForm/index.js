import React, { useState, useMemo, useCallback } from 'react';
import { func, node, object } from 'prop-types';
import { Form } from 'react-final-form';

import { Block, Button } from 'sly/common/system';
import Chevron from 'sly/common/icons/Chevron';

const WizardForm = ({ initialValues = {}, children, onSubmit }) => {
  const [page, setPage] = useState(0);
  const [values, setValues] = useState(initialValues);

  const totalSteps = useMemo(() => React.Children.count(children), [children]);

  const activePage = useMemo(
    () => React.Children.toArray(children)[page],
    [page, children],
  );

  const isLastPage = useMemo(() => page === totalSteps - 1, [
    page,
    totalSteps,
  ]);

  const onNext = useCallback(
    (values) => {
      setValues(values);
      setPage(
        Math.min(page + 1, React.Children.toArray(children).length - 1),
      );
    },
    [page, children],
  );

  const onBack = useCallback(
    () => setPage(Math.max(page - 1, 0)),
    [page],
  );

  const validate = values => activePage.props.validate ? activePage.props.validate(values) : {};

  const handleSubmit = values => isLastPage ? onSubmit(values) : onNext(values);
  return (
    <Form
      initialValues={values}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          {activePage}
          <Block
            display="flex"
            sx={{
            pt: 'l',
            flexDirection: 'row',
            justifyContent: page > 0 ? 'space-between' : 'flex-end',
          }}
          >
            {page > 0 && (
              <Block 
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  cursor: 'pointer',
                }} 
                onClick={onBack}
              >
                <Chevron rotation={270} />
                <Block
                  as="span"
                  pl="xxs"
                >
                  Back
                </Block>
              </Block>
            )}
            {!isLastPage && <Button type="submit">Continue</Button>}
            {isLastPage && (
              <Button type="submit" disabled={submitting}>
                Submit
              </Button>
            )}
          </Block>
          {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
        </form>
      )}
    </Form>
  );
};

WizardForm.propTypes = {
  initialValues: object,
  children: node,
  onSubmit: func,
  validate: func,
};

export default WizardForm;
