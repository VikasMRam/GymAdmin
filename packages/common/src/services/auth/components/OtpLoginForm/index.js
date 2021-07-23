import React, { useRef, useState } from 'react';
import { func, bool, string, object, number } from 'prop-types';

import { Flex, Input, Block, Hr } from 'sly/common/system';
import ButtonLink from 'sly/common/components/molecules/ButtonLink/newSystem';
import { useNotification } from 'sly/web/components/helpers/notification';


const InputCode = ({ length, loading, onComplete }) => {
  const [code, setCode] = useState([...Array(length)].map(() => ''));
  const inputs = useRef([]);
  const { notifyError } = useNotification();

  const processInput = (e, slot) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1) {
      inputs.current[slot + 1].focus();
    }
    if (newCode.every(num => num !== '')) {
      onComplete(newCode.join(''));
    }
  };

  const onKeyDown = (e, slot) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0 && !(slot === length - 1 && !!code[slot])) {
      const newCode = [...code];
      newCode[slot - 1] = '';
      setCode(newCode);
      inputs.current[slot - 1].focus();
    }
  };


  const handlePaste = (e) => {
    e.preventDefault();
    const code = e.clipboardData.getData('Text');
    const parsedCode = code.match(/\d{0,6}/g)?.[0];
    if (parsedCode) {
      setCode(parsedCode.split(''));
      if (parsedCode.length === 6) {
        onComplete(parsedCode);
      }
    } else {
      notifyError('Please paste your 6 digit number code');
    }
  };


  return (
    <Flex flexDirection="column" alignItems="start">
      <Flex justifyContent="start" alignItems="center" >
        {code.map((num, idx) => {
          return (
            <Input
              name={idx}
              onPaste={handlePaste}
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              type="text"
              maxLength={1}
              value={num}
              autoFocus={!code[0].length && idx === 0}
              readOnly={loading}
              onChange={e => processInput(e, idx)}
              onKeyDown={e => onKeyDown(e, idx)}
              ref={ref => inputs.current.push(ref)}
              width="m"
              height="l"
              mr="xs"
              px="m"
              pad="m"
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

InputCode.propTypes = {
  length: number,
  loading: bool,
  onComplete: func,
};

InputCode.defaultProps = {
  length: 6,
};


const OtpLoginForm = ({
  onSubmit, onPasswordLoginClick, submitError, formState, onResendCodeClick,  passwordExists, onEditPhoneNumberClick,
}) => (
  <Flex alignItems="center" flexDirection="column">
    <Block pad="l">
      Enter the 6-digit-code sent to {formState && formState.phone_number ? formState.phone_number : ''}.  <ButtonLink onClick={onEditPhoneNumberClick}>Edit phone number</ButtonLink>
    </Block>
    <InputCode onComplete={onSubmit} />
    <Block pad="l" color="red">{submitError}</Block>
    <Block> Need a new code?
      <ButtonLink onClick={onResendCodeClick}> Resend</ButtonLink>
    </Block>
    <Hr my="l" width="xxxl" />
    {passwordExists &&
      <Block> Or you can
        <ButtonLink onClick={onPasswordLoginClick}> log in with a password</ButtonLink>
      </Block>}
  </Flex>
);

OtpLoginForm.propTypes = {
  onSubmit: func.isRequired,
  invalid: bool,
  submitError: string,
  formState: object.isRequired,
  onResendCodeClick: func,
  passwordExists: bool,
  onPasswordLoginClick: func.isRequired,
  onEditPhoneNumberClick: func.isRequired,
};

export default OtpLoginForm;
