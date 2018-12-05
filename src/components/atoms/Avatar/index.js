import React from 'react';
import { string, shape } from 'prop-types';
import styled, { css } from 'styled-components';

import { size, palette } from 'sly/components/themes';

const styles = css`
  border-radius: ${size('spacing.xLarge')};
  width: ${size('element.large')};
  height: ${size('element.large')};
`;

const StyledImg = styled.img`
  ${styles};
`;

const StyledDiv = styled.div`
  ${styles};

  display: flex;
  align-items: center;
  justify-content: center;
  background: ${palette('accent')};
  color: ${palette('white', 'base')};
  font-size: ${size('text.subtitle')};
  font-weight: 700;
`;

const Avatar = ({ user, ...props }) =>
  user.picture ? (
    <StyledImg src={user.picture} title={user.name} {...props} />
  ) : (
    <StyledDiv data-title={user.name} {...props}>
      <span>{user.name[0]}</span>
    </StyledDiv>
  );

Avatar.propTypes = {
  palette: string,
  user: shape({
    name: string.isRequired,
    picture: string,
  }),
};

Avatar.defaultProps = {
  palette: 'primary',
};

export default Avatar;
