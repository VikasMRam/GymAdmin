import React, { Component } from 'react';
import {
  oneOf,
  oneOfType,
  arrayOf,
  shape,
  string,
  number,
  func,
  bool,
} from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp, prop, switchProp } from 'styled-tools';

import { size } from 'sly/common/components/themes';
import { Button } from 'sly/web/components/atoms';

const Wrapper = styled.div`
  ${switchProp('orientation', {
    horizontal: css`
      display: flex;
      > * {
        flex: 1;
      }

      flex-wrap: wrap;
    `,
    vertical: css`
      > * {
        width: 100%;
        margin-bottom: ${size('spacing.regular')}
      }
`,
  })}

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    // hack % in AdvancedInfoForm
    ${ifProp('width', css`
      width: ${prop('width')};
`)};
  }
`;

const StyledButton = styled(Button)`
  ${switchProp('orientation', {
    horizontal: css`
      margin-left: 0;
      :not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      :not(:last-child) {
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    `,
  })}
`;

const isSelected = (type, value, option) => (type === 'singlechoice')
  ? value === option
  : value.includes(option);


export default class MultipleChoice extends Component {
  // TODO: INvalid
  static propTypes = {
    options: arrayOf(shape({
      value: oneOfType([string, number]).isRequired,
      label: string,
      type: string,
      href: string,
      to: string,
      target: string,
    })).isRequired,
    invalid: bool,
    value: oneOfType([
      oneOfType([string, number]),
      arrayOf(oneOfType([string, number])),
    ]).isRequired,
    type: oneOf(['multiplechoice', 'singlechoice', 'buttonlist']),
    width: string, // hack % in AdvancedInfoForm
    buttonKind: string,
    buttonPalette: string,
    orientation: oneOf(['horizontal', 'vertical']),
    onBlur: func,
    onChange: func,
  };

  static defaultProps = {
    value: [],
    orientation: 'horizontal',
  };

  onBlur = () => {
    const { onBlur, value } = this.props;
    onBlur(value);
  };

  onClick(option) {
    const { value, type, onChange } = this.props;

    if (type === 'singlechoice' || type === 'buttonlist') {
      return onChange(option);
    }

    const index = value.indexOf(option);
    if (index === -1) {
      onChange([...value, option]);
    } else {
      const copy = [...value];
      copy.splice(index, 1);
      onChange(copy);
    }
    return null;
  }

  render() {
    const {
      options,
      value,
      type,
      onBlur,
      invalid,
      buttonKind,
      buttonPalette,
      orientation,
      ...props
    } = this.props;

    return (
      <Wrapper onBlur={this.onBlur} orientation={orientation} {...props}>
        {options &&
          options.map(({
            value: option, label, type: buttonType, href, to, target,
          }) => (
            <StyledButton
              orientation={orientation}
              selectable={type === 'singlechoice' || type === 'multiplechoice'}
              selected={isSelected(type, value, option)}
              key={option}
              kind={buttonKind}
              type={buttonType}
              palette={buttonPalette}
              href={href}
              to={to}
              target={target}
              onClick={() => this.onClick(option)}
            >
              {label}
            </StyledButton>
          ))}
      </Wrapper>
    );
  }
}
