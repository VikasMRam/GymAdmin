import React, { Component } from 'react';
import { string, node, bool, object } from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { enableExperimentsDebugger, isProd } from 'sly/config';
import SlyEvent from 'sly/services/helpers/events';
import { size } from 'sly/components/themes';
import { getExperiment } from 'sly/store/selectors';
import { selectedExperimentVariants } from 'sly/services/experiments/helpers';

const DebugWrapper = styled.div`
  position: relative;
  outline: ${size('border.regular')} solid ${prop('color')};

  :hover > span {
    display: block;
  }
`;

export class Experiment extends Component {
  static propTypes = {
    name: string.isRequired,
    disabled: bool,
    defaultVariant: string,
    variantKey: string,
    children: node,
    location: object,
  };

  static defaultProp = {
    disabled: false,
  };

  componentWillMount() {
    // read query string: ?experimentEvaluations=Organisms_Concierge_Calendly:original_flow,Organisms_Footer_Calendly:original_flow
    this.experimentsOverrides = {};
    if (!isProd) {
      const { location } = this.props;
      if (location) {
        const { search } = location;
        const qs = queryString.parse(search);
        if (qs.experimentEvaluations) {
          const qsParts = qs.experimentEvaluations.split(',');
          this.experimentsOverrides = qsParts.reduce((obj, e) => {
            const eParts = e.split(':');
            if (eParts.length > 1) {
              obj[eParts[0]] = eParts[1];
            }
            return obj;
          }, {});
        }
      }
    }
  }

  componentDidMount() {
    this.sendExperimentEvent('view_experiment');
  }

  componentWillUnmount() {
    this.sendExperimentEvent('complete_experiment');
  }

  sendExperimentEvent(action) {
    const { disabled, name } = this.props;
    if (!disabled) {
      const event = {
        action, category: name, label: 'experiments', value: this.selectedVariant, nonInteraction: true,
      };
      SlyEvent.getInstance().sendEvent(event);
    }
  }

  render() {
    const {
      children, name, variantKey, defaultVariant, disabled,
    } = this.props;
    this.selectedVariant = variantKey || defaultVariant;
    if (disabled) {
      this.selectedVariant = defaultVariant;
    }
    if (this.experimentsOverrides[name]) {
      this.selectedVariant = this.experimentsOverrides[name];
      if (enableExperimentsDebugger) {
        console.info(`[Experiments] overriding experiment ${name} using query parameter. specified variant will be selected.`);
      }
    }
    if (!variantKey && enableExperimentsDebugger) {
      console.info(`[Experiments] failed evaluating experiment ${name}. defaultVariant will be selected.`);
    }
    let childrenArray = Array.isArray(children) ? children : [children];
    childrenArray = childrenArray.filter(a => a); // To remove all false values
    let [variant] = childrenArray;
    if (this.selectedVariant) {
      const variantChildren = childrenArray.filter(c => c.props.name === this.selectedVariant);
      if (variantChildren.length === 0 && enableExperimentsDebugger) {
        console.info(`[Experiments] experiment ${name} has no valid Variant ${this.selectedVariant}.`);
        return null;
      }
      variant = variantChildren[0] || null;
    } else {
      this.selectedVariant = variant.props.name;
      if (enableExperimentsDebugger) {
        console.info(`[Experiments] experiment ${name} has no default variant. first variant will be selected.`);
      }
    }
    if (enableExperimentsDebugger) {
      console.info(`[Experiments] experiment ${name} has variant ${this.selectedVariant}.`);
    }
    this.selectedVariantRendered = true;
    if (!disabled) {
      selectedExperimentVariants[name] = this.selectedVariant;
    }
    if (variant && enableExperimentsDebugger) {
      const color = `#${Math.random().toString(16).slice(2, 8)}`;
      return (
        <DebugWrapper color={color} title={`Experiment ${name}: variant is ${this.selectedVariant}`}>
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

export default withRouter(connect(mapStateToProps)(Experiment));
