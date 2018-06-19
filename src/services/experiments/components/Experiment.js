import React, { Component } from 'react';
import { string, node, bool } from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { connect } from 'react-redux';
import { palette } from 'styled-theme';

import { isDev } from 'sly/config';
import { size } from 'sly/components/themes';
import { getExperiment } from 'sly/store/selectors';

const DebugWrapper = styled.div`
  position: relative;
  outline: ${size('border.regular')} solid ${prop('color')};

  :hover > span {
    display: block;
  }
`;
const DebugInfo = styled.span`
  padding: ${size('spacing.tiny')} ${size('spacing.regular')};
  color: ${palette('white', 0)};
  background-color: ${prop('color')};
  position: absolute;
  left: -${size('border.regular')};
  display: none;
`;

class Experiment extends Component {
  static propTypes = {
    name: string.isRequired,
    disabled: bool,
    defaultVariant: string,
    variantKey: string,
    children: node,
  };

  static defaultProp = {
    disabled: false,
  };

  render() {
    const {
      children, name, variantKey, defaultVariant, disabled,
    } = this.props;
    let selectedVariant = variantKey || defaultVariant;
    if (disabled) {
      selectedVariant = defaultVariant;
    }
    if (!variantKey && isDev) {
      console.info(`[Experiments] failed evaluating experiment ${name}. defaultVaraint will be selected.`);
    }
    const childrenArray = Array.isArray(children) ? children : [children];
    let [variant] = childrenArray;
    if (selectedVariant) {
      const variantChildren = childrenArray.filter(c => c.props.name === selectedVariant);
      if (variantChildren.length === 0 && isDev) {
        console.info(`[Experiments] experiment ${name} has no valid Variant ${selectedVariant}.`);
        return null;
      }
      variant = variantChildren[0] || null;
    } else if (isDev) {
      console.info(`[Experiments] experiment ${name} has no default variant. first variant will be selected.`);
    }
    if (isDev) {
      console.info(`[Experiments] experiment ${name} has variant ${selectedVariant}.`);
    }
    this.selectedVariantRendered = true;

    if (variant && isDev) {
      const color = `#${Math.random().toString(16).slice(2, 8)}`;
      return (
        <DebugWrapper color={color}>
          <DebugInfo color={color}>
            Experiment <b>{name}</b>: variant is <b>{selectedVariant}</b>
          </DebugInfo>
          {variant}
        </DebugWrapper>
      );
    }

    return variant;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { name } = ownProps;
  const variantKey = getExperiment(state, name);

  return {
    variantKey,
  };
};

export default connect(mapStateToProps)(Experiment);
