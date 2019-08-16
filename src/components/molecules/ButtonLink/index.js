import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import { Icon, Block } from 'sly/components/atoms';

const Wrapper = styled.div`
  
`;

const ButtonLink = ({ icon, palette, size, children, ...props }) => (
  <Wrapper {...props}>
    {icon && <Icon icon={icon} palette={palette} size={size} />}
    <Block palette={palette} size={size}>{children}</Block>
  </Wrapper>
);


ButtonLink.propTypes = {
  palette: string.isRequired,
  size: string.isRequired,
  icon: string,
};

ButtonLink.defaultProps = {
  palette: 'secondary',
  size: 'regular',
};

export default ButtonLink;
