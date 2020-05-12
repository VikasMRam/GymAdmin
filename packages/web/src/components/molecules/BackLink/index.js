import React from 'react';
import { func, string, any } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import { Link, Span, Icon } from 'sly/web/components/atoms';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BackArrorIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const StyledLink = styled(Link)`
  display: inline-block;
`;

const BackLink = ({
  to, onClick, linkText, children, className,
}) => (
  <StyledLink to={to} onClick={onClick} className={className}>
    <Wrapper>
      <BackArrorIcon icon="arrow-left" size="small" palette="primary" />
      <Span size="caption" palette="primary">{linkText || children}</Span>
    </Wrapper>
  </StyledLink>
);

BackLink.propTypes = {
  className: string,
  to: string.isRequired,
  onClick: func,
  linkText: string,
  children: any,
};

BackLink.defaultProps = {
  linkText: 'Back',
};

export default BackLink;
