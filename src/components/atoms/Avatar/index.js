import React from 'react';
import { string, shape } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { palette } from 'styled-theme';
import { size } from 'sly/components/themes/default';

const styles = css`
  border-radius: ${size('borderRadius.lgElemRound')};
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
  background: ${palette(1)};
  color: ${palette('white', 0)};
  font-size: ${size('text.subtitle')};
  font-weight: 700;
`;

const Avatar = ({ user, ...props }) => user.picture
  ? <StyledImg src={user.picture} title={user.name} {...props} />
  : <StyledDiv data-title={user.name} {...props}>
      <span>{user.name[0]}</span>
    </StyledDiv>;

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
