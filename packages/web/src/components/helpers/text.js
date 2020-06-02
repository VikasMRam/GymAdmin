import styled, { css } from 'styled-components';
import { string } from 'prop-types';

import { setDisplayName } from 'sly/web/components/helpers/index';
import { size } from 'sly/web/components/themes';

export const textAlign = (Component, which = 'center') => styled(Component)`
  text-align: ${which};
`;

export const textDecoration = (Component, decoration = 'underline') => setDisplayName(styled(Component)`
  text-decoration: ${decoration};
`, Component.displayName);

export const textTransform = (Component, transform = 'capitalize') => styled(Component)`
  text-transform: ${transform};
`;

const getSize = type => p => size(type, p.size);
export const withText = (Component) => {
  const WithText = styled(Component)`
    font-size: ${getSize('text')};
    line-height: ${getSize('lineHeight')};
    font-weight: ${p => size('weight', p.weight)};
  `;
  WithText.displayName = `withText(${Component.displayName || Component.name})`;
  WithText.propTypes = {
    size: string,
    weight: string,
  };
  WithText.defaultProps = {
    size: null,
    weight: null,
  };
  return WithText;
};
