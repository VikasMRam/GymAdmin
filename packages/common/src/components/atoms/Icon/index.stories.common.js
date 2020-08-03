import React from 'react';
import { arrayOf, string } from 'prop-types';
import styled from 'styled-components';

import Icon from '.';

import { size, palette } from 'sly/common/components/themes';
import Block from 'sly/common/components/atoms/Block';

const Wrapper = styled(Block)`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled(Block)`
  background: ${palette('grey', 'background')};
  border: ${size('border.regular')} solid ${palette('grey', 'base')};
  border-radius: ${size('border.xLarge')};
  flex-direction: column;
  width: ${size('element.xHuge')};
  height: ${size('element.xHuge')};
  margin: ${size('spacing.medium')};
  padding: ${size('spacing.small')};
`;

const StyledBlock = styled(Block)`
  margin-top: ${size('spacing.medium')};
`;

const StyledIcon = styled(Icon)`
  border: ${size('border.regular')} solid ${palette('grey', 'base')};
  background: ${palette('white', 'base')};
  border-radius: ${size('border.large')};
`;

export function Icons({ icons, ...props }) {
  return (
    <Wrapper>
      {icons.map(icon => (
        <Card align="center" title={icon} key={icon}>
          <StyledIcon icon={icon} size="title" {...props} />
          <StyledBlock size="caption" numberOfLines={1}>{icon}</StyledBlock>
        </Card>
      ))}
    </Wrapper>
  );
}

Icons.propTypes = {
  icons: arrayOf(string),
};

Icons.defaultProps = {
  icons: [],
};
