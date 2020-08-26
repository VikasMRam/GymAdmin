import React from 'react';
import { any, string } from 'prop-types';
import styled, { css } from 'styled-components';

import Block from 'sly/common/components/atoms/Block';
import { startingWith } from 'sly/common/components/helpers';

const Wrapper = styled(Block)`
  ${startingWith('laptop', css`
     display: flex;
     & > :last-child {
        flex-grow: 1;
     }
  `)}
`;

export default function FieldRow({ label, children, ...props }) {
  return (
    <Wrapper
      marginBottom="large"
      {...props}
    >
      <Block
        as="label"
        size="caption"
        width="162px"
        marginRight="xLarge"
      >
        {label}
      </Block>
      {children}
    </Wrapper>
  );
}

FieldRow.propTypes = {
  label: string,
  children: any,
};
