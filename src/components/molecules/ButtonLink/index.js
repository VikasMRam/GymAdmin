import React from 'react';
import styled from 'styled-components';
import { string, any } from 'prop-types';

import { Icon, Block } from 'sly/components/atoms';

const Wrapper = styled.div`
  display: inline-flex;
`;

const ButtonLink = ({ icon, palette, size, children, ...props }) => (
  <Wrapper {...props}>
    {icon && <Icon icon={icon} palette={palette} size={size} />}
    {children && <Block palette={palette} size={size}>{children}</Block>}
  </Wrapper>
);


ButtonLink.propTypes = {
  palette: string.isRequired,
  size: string,
  icon: string,
  children: any,
};

ButtonLink.defaultProps = {
  palette: 'secondary',
};

export default ButtonLink;
