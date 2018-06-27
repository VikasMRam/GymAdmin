import React, { Component } from 'react';
import { string, node, bool } from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { connect } from 'react-redux';

import { enableExperimentsDebugger } from 'sly/config';
import { size } from 'sly/components/themes';
import { getExperiment } from 'sly/store/selectors';

const DebugWrapper = styled.div`
  position: relative;
  outline: ${size('border.regular')} solid ${prop('color')};

  :hover > span {
    display: block;
  }
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
    if (!variantKey && enableExperimentsDebugger) {
      console.info(`[Experiments] failed evaluating experiment ${name}. defaultVaraint will be selected.`);
    }
    const childrenArray = Array.isArray(children) ? children : [children];
    let [variant] = childrenArray;
    if (selectedVariant) {
      const variantChildren = childrenArray.filter(c => c.props.name === selectedVariant);
      if (variantChildren.length === 0 && enableExperimentsDebugger) {
        console.info(`[Experiments] experiment ${name} has no valid Variant ${selectedVariant}.`);
        return null;
      }
      variant = variantChildren[0] || null;
    } else if (enableExperimentsDebugger) {
      console.info(`[Experiments] experiment ${name} has no default variant. first variant will be selected.`);
    }
    if (enableExperimentsDebugger) {
      console.info(`[Experiments] experiment ${name} has variant ${selectedVariant}.`);
    }
    this.selectedVariantRendered = true;

    if (variant && enableExperimentsDebugger) {
      const color = `#${Math.random().toString(16).slice(2, 8)}`;
      return (
        <DebugWrapper color={color} title={`Experiment ${name}: variant is ${selectedVariant}`}>
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
