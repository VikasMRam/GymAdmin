import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Link, Span, Icon } from 'sly/components/atoms';

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
  to, onClick, linkText, className,
}) => (
  <StyledLink to={to} onClick={onClick} className={className}>
    <Wrapper>
      <BackArrorIcon icon="arrow-left" size="small" palette="primary" />
      <Span size="caption" palette="primary">{linkText}</Span>
    </Wrapper>
  </StyledLink>
);

BackLink.propTypes = {
  className: string,
  to: string.isRequired,
  onClick: func,
  linkText: string,
};

BackLink.defaultProps = {
  linkText: 'Back',
};

export default BackLink;
