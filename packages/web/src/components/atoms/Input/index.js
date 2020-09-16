import React, { Component } from 'react';
import { bool, oneOf, func } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette, getKey } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import {
  withDisplay,
  withColor,
  withSpacing,
  withBorder,
  withCursor,
  withWidth,
  withHeight,
  withText,
  withSnap,
} from 'sly/common/components/helpers';

const focusBorderColor = p => (!p.warning && !p.invalid) ? palette('primary', 'base') : null;

export const styles = css`
  ${withColor}
  ${withSpacing}
  ${withBorder}
  ${withSnap}
  ${withCursor}
  ${withWidth}
  ${withHeight}
  ${withText}
  ${withDisplay}

  min-width: ${ifProp({ type: 'textarea' }, '100%', 'initial')};
  max-width: ${ifProp({ type: 'textarea' }, '100%', 'initial')};

  &:focus {
    outline: none;
    border-color: ${focusBorderColor};
  }

  &::placeholder {
    color: ${palette('stroke', 'filler')};
  }

  &[type='checkbox'],
  &[type='radio'] {
    display: inline-block;
    border: 0;
    border-radius: 0;
    width: auto;
    height: auto;
    margin: 0 ${size('spacing.small')} 0 0;
  }
  &[type='search'] {
    background-image: url(${assetPath('icons/search-caption.svg')});
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-position-x: ${size('spacing', 'medium')};
    background-position-y: center;
    padding-left: calc(${size('spacing', 'medium')} + ${size('spacing', 'xxLarge')});
  }

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${palette('slate', 'filler')};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: ${palette('slate', 'filler')};
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: ${palette('slate', 'filler')};
  }
`;

const StyledTextarea = styled.textarea`
  ${styles};
`;

const StyledSelect = styled.select`
  ${styles};
`;
const StyledInput = styled.input`
  ${styles};
`;

export default class Input extends Component {
  static propTypes = {
    type: oneOf([
      'search',
      'textarea',
      'select',
      'text',
      'file',
      'checkbox',
      'radio',
      'password',
      'number',
      'hidden',
      'date',
      'locationSearch',
    ]).isRequired,
    size: oneOf(['small', 'regular', 'button', 'large', 'xLarge']).isRequired,
    onFocus: func,
    invalid: bool,
    readOnly: bool,
    warning: bool,
  };

  static defaultProps = {
    type: 'text',
    display: 'block',
    width: '100%',
    margin: '0',
    padding: 'medium',
    size: 'button',
    borderRadius: 'small',
    background: 'white.base',
    palette: 'slate.base',
    border: 'regular',
    borderPalette: 'slate.lighter-90',
  };

  onFocus = (...args) => {
    if (this.props.onFocus) {
      this.props.onFocus(...args);
    }
  };

  render() {
    const { size, ...props } = this.props;

    if (props.type === 'textarea') {
      props.height = getKey('sizes.element.huge');
    } else if (size) {
      props.height = getKey('sizes.element', size);
    }

    props.size = 'caption';

    if (props.disabled || props.readOnly) {
      props.background = 'grey.stroke';
      props.palette = 'grey.base';
    } else if (props.warning) {
      props.background = 'warning.stroke';
      props.borderPalette = 'warning.base';
    } else if (props.invalid) {
      props.background = 'danger.stroke';
      props.borderPalette = 'danger.base';
    }

    if (props.type === 'textarea') {
      return <StyledTextarea {...props} />;
    } else if (props.type === 'select') {
      return <StyledSelect {...props} disabled={props.readOnly} />;
    }
    return <StyledInput {...props} onFocus={this.onFocus} autoComplete="new-password" />;
  }
}
