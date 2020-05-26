import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { string } from 'prop-types';

import { size } from 'sly/web/components/themes';

const spacing = ({ pad }) => size('spacing', pad);
export const withPad = (Component) => {
  const WithPad = styled(Component)`
    ${ifProp('pad', css`
      margin-bottom: ${spacing};
    `)}
  `;
  WithPad.displayName = `withPad(${Component.displayName || Component.name})`;
  WithPad.propTypes = {
    pad: string,
  };
  WithPad.defaultProps = {
    pad: null,
  };
  return WithPad;
};

const pad = (Component, which = 'xLarge') => styled(Component)`
  margin-bottom: ${size('spacing', which)};
`;

export default pad;
