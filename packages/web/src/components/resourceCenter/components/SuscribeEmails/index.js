import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';

import { cmsUrl } from 'sly/web/config';
import apiFetch from 'sly/web/services/api/apiFetch';
import { sx, sx$tablet, space } from 'sly/common/system/sx';
import Block from 'sly/common/system/Block';
import Button from 'sly/common/system/Button';
import Hr from 'sly/common/system/Hr';
import Input from 'sly/common/system/Input';
import Notification from 'sly/web/components/molecules/Notification';

const StyledButton = styled(Button)`
  width: 100%;
  padding: ${space('s')} ${space('l')};
  margin-top: ${space('s')};
  ${sx({ font: 'body-m' })}
  border: none;
  overflow: visible;

  ${sx$tablet`
    width: auto;
    margin-top: 0;
    margin-left: ${space('s')};
  `}
`;

const Title = styled(Block)`
  ${sx({ font: 'title-l' })}
  ${sx$tablet`
    text-align: center;
  `}
`;

const Description = styled(Block)`
  ${sx({ font: 'body-l' })}
  ${sx$tablet`
    text-align: center;
  `}
`;

const NotificationWrapper = styled(Block)`
  display: ${({ visible }) => visible ? 'block' : 'none'};
  position: fixed;
  top: 0;
  width: 100%;
`;

const SubscribeEmail = () => {
  const [value, setValue] = useState('');
  const [requestRes, setRequestRes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(() => {
    setIsLoading(true);
    apiFetch(
      cmsUrl,
      '/subscribe-mailchimp',
      {
        method: 'POST',
        body: JSON.stringify({ email: value }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => {
        setRequestRes({ status: res.status, title: res.body.title });
        setIsLoading(false);
      })
      .catch((err) => {
        setRequestRes({ status: err.body.statusCode, title: err.body.message });
        setIsLoading(false);
      });
  }, [value]);

  return (
    <>
      <Block
        padding="xxl m"
        background="harvest.lighter-90"
        sx$tablet={{ padding: 'xxxl auto' }}
      >
        <Title marginBottom="l">Sign up for our newsletter</Title>

        <Description marginBottom="l" sx$tablet={{ width: 'col8', marginX: 'auto' }}>
          Want to learn from leaders and innovators in our industry?
          Want to stay up on home care tips and tactics—and trends
          that affect your business? Give us your email, and we’ll
          keep you informed.
        </Description>

        <Block sx$tablet={{ display: 'flex', width: 'col6', marginX: 'auto' }}>
          <Input
            value={value}
            onChange={evt => setValue(evt.target.value)}
            placeholder="Your email address"
            flexGrow="1"
          />
          <StyledButton flexGrow="0" disabled={isLoading || !value.trim()} onClick={onSubmit}>Sign up</StyledButton>
        </Block>
      </Block>

      <Hr />

      <NotificationWrapper visible={requestRes}>
        <Notification {...(requestRes && {
          isOpen: true,
          type: requestRes?.status === 200 ? 'default' : 'error',
          onClose: () => setRequestRes(null),
        })}
        >
          {requestRes?.title}
        </Notification>
      </NotificationWrapper>
    </>
  );
};

export default SubscribeEmail;
