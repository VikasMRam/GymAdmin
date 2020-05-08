import { Component } from 'react';
import { string, node, func } from 'prop-types';
import { withExperimentContext } from 'sly/services/experiments/components/Context';

@withExperimentContext

export default class Variant extends Component {
  static propTypes = {
    name: string.isRequired,
    children: node,
    onView: func,
  };

  static defaultProps = {
    children: null,
  };

  constructor(props) {
    super(props);
    const { experimentContext, name } = props;
    experimentContext.addVariant(name);
  }

  componentDidMount() {
    const { onView } = this.props;

    if (onView) {
      onView();
    }
  }

  shouldRenderVariant() {
    const { experimentContext, name } = this.props;
    const { variants } = experimentContext;

    const isTheFirstVariant = variants.indexOf(name) === 0;
    const isTheDefaultVariant = !experimentContext.selected && isTheFirstVariant;
    const isTheSelectedVariant = experimentContext.selected === name;

    return !!(isTheSelectedVariant || isTheDefaultVariant);
  }

  render() {
    if (!this.shouldRenderVariant()) {
      return null;
    }
    return this.props.children;
  }
}
