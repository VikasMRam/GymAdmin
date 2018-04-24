import React from 'react';
import { shape, string, func } from 'prop-types';

import styled from 'styled-components';

import { Button, Block, Icon, Heading } from 'sly/components/atoms';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Thankyou = ({ community, onClose }) => (
  <Wrapper>
    <Icon icon="seniorlyLogo" size="xLarge" />
    <Heading>Thank you!</Heading>
    <Block>
      Your message have succesfully been sent.
      {community.name} will be in touch shortly.
    </Block>
    {onClose && <Button onClick={onClose}>Done</Button>}
  </Wrapper>    
);

Thankyou.propTypes = {
  community: shape({
    name: string.isRequired,
  }).isRequired,
  onClose: func.isRequired,
};

export default Thankyou;

