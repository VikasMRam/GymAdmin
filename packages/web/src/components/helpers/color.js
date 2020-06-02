import { size } from 'sly/web/components/themes';
import styled from 'styled-components';
import { string } from 'prop-types';

const getSize = type => p => size(type, p.size);
export const withColor = (Component) => {
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
