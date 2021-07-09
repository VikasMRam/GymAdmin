import React from 'react';
import styled from 'styled-components';
import { useField } from 'react-final-form';
import { func, string } from 'prop-types';

import Input from 'sly/common/system/Input';
import Flex from 'sly/common/system/Flex';

const ErrorText = styled.div`
  font-size: 15px;
  color: #DC3133;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #717780;
`;

const InputFormField = (props) => {
  const {
    input,
    meta: { error, touched, submitError },
  } = useField(props.name, {
    initialValue: props.initialValue,
    validate: props.validate,
  });

  const inputProps = {
    ...props,
    error: touched && error && true,
    ...input,
  };

  return (
    <>
      <Flex
        flexDirection={props.labelCheckbox ? 'row' : 'column'}
        alignItems={props.labelCheckbox ? 'center' : ''}
      >
        {props.label && (
          <Label>{props.label}</Label>
        )}
        <Input {...inputProps} />
        {touched && (error || submitError) && (
          <ErrorText>{error}</ErrorText>
        )}
        {props.labelCheckbox && (
          <Label>{props.labelCheckbox}</Label>
        )}
      </Flex>
    </>
  );
};

InputFormField.propTypes = {
  validate: func,
  initialValue: string,
  name: string,
  label: string,
  labelCheckbox: string,
};

export default InputFormField;
