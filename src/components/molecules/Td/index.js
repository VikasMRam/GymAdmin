import React from 'react';
import styled, { css } from 'styled-components';
import { node, bool, string, number } from 'prop-types';
import { switchProp, ifProp, ifNotProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import Link from 'sly/components/atoms/Link';
import Stage from 'sly/components/atoms/Stage';
import Block from 'sly/components/atoms/Block';
import Icon from 'sly/components/atoms/Icon';

const disabledWrapperStyles = css`
  background-color: ${palette('white', 'base')};
  ${ifProp('disabled', css`
  background-color: ${palette('grey', 'background')};
  `)}
`;

const textIconStyles = css`
  ${switchProp('kind', {
    textIcon: css`
      display: flex;
      align-items: center;
      max-width: unset;`,
  })};
`;

const TdWrapper = styled.td`
  max-width: ${size('layout.col3')};
  ${ifNotProp('borderless', css`
    padding: ${size('spacing.regular')} ${size('spacing.large')};
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  `)}

  ${disabledWrapperStyles}
  ${textIconStyles}
`;

const clipStyles = css`
  ${ifProp('clip', css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: clip;
    width: inherit;
  `)}
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
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const BlockWrapper = styled.div`
  ${disabledWrapperStyles}
  ${textIconStyles}
`;

export const Td = ({
  children, disabled, borderless, kind,
}) => (
  <TdWrapper
    disabled={disabled}
    kind={kind}
    borderless={borderless}
  >
    {children}
  </TdWrapper>
);

Td.propTypes = {
  children: node,
  kind: string,
  disabled: bool,
  borderless: bool,
};

export const TextTd = ({
  children, disabled, borderless, clip, ...props
}) => (
  <Td disabled={disabled} borderless={borderless}>
    <TextChildrenBlock size="caption" disabled={disabled} clip={clip} {...props}>
      {children}
    </TextChildrenBlock>
  </Td>
);

TextTd.propTypes = {
  children: string.isRequired,
  disabled: bool,
  borderless: bool,
  clip: bool,
};

export const DoubleLineTd = ({
  firstLine, secondLine, disabled, borderless, clip, ...props
}) => (
  <Td disabled={disabled} borderless={borderless}>
    <DoubleLineBlock size="caption" disabled={disabled} clip={clip} {...props}>
      {firstLine}
    </DoubleLineBlock>
    <DoubleLineBlock size="tiny" palette="grey" disabled={disabled} clip={clip} {...props}>
      {secondLine}
    </DoubleLineBlock>
  </Td>
);

DoubleLineTd.propTypes = {
  firstLine: string.isRequired,
  secondLine: string.isRequired,
  disabled: bool,
  borderless: bool,
  clip: bool,
};

export const DoubleLineDiv = ({
  firstLine, secondLine, disabled, clip, ...props
}) => (
  <BlockWrapper disabled={disabled}>
    <DoubleLineBlock size="caption" disabled={disabled} clip={clip} {...props}>
      {firstLine}
    </DoubleLineBlock>
    <DoubleLineBlock size="tiny" palette="grey" disabled={disabled} clip={clip} {...props}>
      {secondLine}
    </DoubleLineBlock>
  </BlockWrapper>
);

DoubleLineDiv.propTypes = {
  firstLine: string.isRequired,
  secondLine: string.isRequired,
  disabled: bool,
  clip: bool,
};

export const LinkTd = ({
  children, disabled, borderless, clip, ...props
}) => (
  <Td disabled={disabled} borderless={borderless}>
    <LinkChildrenSpan size="caption" disabled={disabled} clip={clip} {...props}>
      {children}
    </LinkChildrenSpan>
  </Td>
);

LinkTd.propTypes = {
  children: string.isRequired,
  disabled: bool,
  borderless: bool,
  clip: bool,
};

export const StageTd = ({
  text, currentStage, disabled, borderless, ...props
}) => (
  <Td disabled={disabled} borderless={borderless}>
    <Stage text={text} currentStage={currentStage} disabled={disabled} {...props} />
  </Td>
);

StageTd.propTypes = {
  text: string.isRequired,
  currentStage: number.isRequired,
  disabled: bool,
  borderless: bool,
};

export const StageDiv = ({
  text, currentStage, disabled, borderless, ...props
}) => (
  <BlockWrapper disabled={disabled}>
    <Stage text={text} currentStage={currentStage} disabled={disabled} {...props} />
  </BlockWrapper>
);

StageDiv.propTypes = {
  text: string.isRequired,
  currentStage: number.isRequired,
  disabled: bool,
  borderless: bool,
};

export const TextIconTd = ({
  children, icon, iconPalette, disabled, borderless, clip, ...props
}) => (
  <Td disabled={disabled} kind="textIcon" borderless={borderless}>
    <TextIconChildrenSpan size="caption" disabled={disabled} clip={clip} {...props}>
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
  borderless: bool,
  clip: bool,
};
