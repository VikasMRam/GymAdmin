import React from 'react';
import styled, { css } from 'styled-components';
import { node, bool, string, number } from 'prop-types';
import { switchProp, ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import Link from 'sly/components/atoms/Link';
import Stage from 'sly/components/atoms/Stage';
import Block from 'sly/components/atoms/Block';
import Icon from 'sly/components/atoms/Icon';

const Wrapper = styled.td`
  width: inherit;
  padding: ${size('spacing.regular')} ${size('spacing.large')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};

  ${ifProp('disabled', css`
    background-color: ${palette('grey', 'background')};
  `)}

  ${switchProp('kind', {
    textIcon: css`
      display: flex;
      align-items: center;`,
  })};
`;

const clipStyles = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;
  width: inherit; 
`;

const disabledStyles = css`
  ${ifProp('disabled', css`
    color: ${palette('slate', 'filler')};
  `)}
`;

const textStyles = css`
  ${clipStyles}
  padding: ${size('spacing.regular')} 0;
`;

const TextChildrenBlock = styled(Block)`
  ${textStyles}
  ${disabledStyles}
`;

const linkStyles = css`
  display: block;
  font-size: ${size('text.caption')};
  line-height: ${size('lineHeight.caption')};
`;

const LinkChildrenSpan = styled(Link)`
  ${textStyles}
  ${linkStyles}
`;

const TextIconChildrenSpan = styled(Link)`
  ${textStyles}
  ${linkStyles}
  margin-right: ${size('spacing.regular')};
`;

const DoubleLineBlock = styled(Block)`
  ${clipStyles}
  ${disabledStyles}
`;

export const Td = ({ children, disabled, kind }) => (
  <Wrapper
    disabled={disabled}
    kind={kind}
  >
    {children}
  </Wrapper>
);

Td.propTypes = {
  children: node.isRequired,
  kind: string,
  disabled: bool,
};

export const TextTd = ({ children, disabled, ...props }) => (
  <Td disabled={disabled}>
    <TextChildrenBlock size="caption" disabled={disabled} {...props}>
      {children}
    </TextChildrenBlock>
  </Td>
);

TextTd.propTypes = {
  children: string.isRequired,
  disabled: bool,
};

export const DoubleLineTd = ({
  firstLine, secondLine, disabled, ...props
}) => (
  <Td disabled={disabled}>
    <DoubleLineBlock size="caption" disabled={disabled} {...props}>
      {firstLine}
    </DoubleLineBlock>
    <DoubleLineBlock size="tiny" palette="grey" disabled={disabled} {...props}>
      {secondLine}
    </DoubleLineBlock>
  </Td>
);

DoubleLineTd.propTypes = {
  firstLine: string.isRequired,
  secondLine: string.isRequired,
  disabled: bool,
};

export const LinkTd = ({ children, disabled, ...props }) => (
  <Td disabled={disabled}>
    <LinkChildrenSpan size="caption" disabled={disabled} {...props}>
      {children}
    </LinkChildrenSpan>
  </Td>
);

LinkTd.propTypes = {
  children: string.isRequired,
  disabled: bool,
};

export const StageTd = ({
  text, currentStage, disabled, ...props
}) => (
  <Td disabled={disabled}>
    <Stage text={text} currentStage={currentStage} disabled={disabled} {...props} />
  </Td>
);

StageTd.propTypes = {
  text: string.isRequired,
  currentStage: number.isRequired,
  disabled: bool,
};

export const TextIconTd = ({
  children, icon, iconPalette, disabled, ...props
}) => (
  <Td disabled={disabled} kind="textIcon">
    <TextIconChildrenSpan size="caption" disabled={disabled} {...props}>
      {children}
    </TextIconChildrenSpan>
    <Icon icon={icon} palette={iconPalette} />
  </Td>
);

TextIconTd.propTypes = {
  children: string.isRequired,
  icon: string.isRequired,
  iconPalette: string,
  disabled: bool,
};
