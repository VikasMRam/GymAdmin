import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';

import { cmsUrl } from 'sly/web/config';
import { startingWith } from 'sly/common/components/helpers';
import { getKey, size } from 'sly/common/components/themes';
import apiFetch from 'sly/web/services/api/apiFetch';
import Block from 'sly/common/components/atoms/Block';
import Button from 'sly/common/components/atoms/Button';
import Hr from 'sly/common/components/atoms/Hr';
import Input from 'sly/web/components/atoms/Input';
import Notification from 'sly/web/components/molecules/Notification';

const StyledButton = styled(Button)`
  width: 100%;
  padding: ${size('spacing.s')} ${size('spacing.l')};
  margin-top: ${size('spacing.s')};
  font-size: ${size('text.body')};
  line-height: ${size('lineHeight.body')};
  border: none;
  overflow: visible;

  ${startingWith(
    'tablet',
    css`
      width: auto;
      margin-top: 0;
      margin-left: ${getKey('sizes.spacing.s')};
    `,
  )}
`;

const Title = styled(Block)`
  font-size: ${size('text.displayS')};
  line-height: ${size('lineHeight.title')};

  ${startingWith('tablet', css`
    font-size: ${getKey('sizes.text.display')};
    line-height: ${getKey('sizes.element.button')};
    text-align: center;
  `)}
`;

const Description = styled(Block)`
  font-size: 1.125rem;
  line-height: ${size('lineHeight.display')};

  ${startingWith('tablet', css({ textAlign: 'center' }))}
`;

const NotificationWrapper = styled(Block)`
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
        paddingY="xxl"
        paddingX="m"
        background="harvest.lighter-90"
        startingWithTablet={{ paddingY: 'xxxl', paddingX: 'auto' }}
      >
        <Title marginBottom="l">Sign up for our newsletter</Title>

        <Description marginBottom="l" startingWithTablet={{ width: size('layout.col8'), marginX: 'auto' }}>
          Want to learn from leaders and innovators in our industry?
          Want to stay up on home care tips and tactics—and trends
          that affect your business? Give us your email, and we’ll
          keep you informed.
        </Description>

        <Block startingWithTablet={{ display: 'flex', width: size('layout.col6'), marginX: 'auto' }}>
          <Input
            size="large"
            value={value}
            onChange={evt => setValue(evt.target.value)}
            placeholder="Your email address"
          />
          <StyledButton disabled={isLoading || !value.trim()} onClick={onSubmit}>Sign up</StyledButton>
        </Block>
      </Block>

      <Hr />

      <NotificationWrapper>
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
