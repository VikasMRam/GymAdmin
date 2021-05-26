import React from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component';
import { InView } from 'react-intersection-observer';

/**
 *
 * @description lazily loads the JS associated with a component and hydrates it based on its distance from viewport
 * @tutorial {@link https://youtu.be/k-A2VfuUROg?t=960} - Rendering on the Web: Performance Implications of Application Architecture
 * @tutorial {@link https://medium.com/@luke_schmuke/how-we-achieved-the-best-web-performance-with-partial-hydration-20fab9c808d5} - Partial Hydration
 */
class Hydrator extends React.Component {
  constructor(props) {
    super(props);
    this.Child = null;
    this.state = {
      renderChild: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.renderChild;
  }

    handleInviewChange = async (inView) => {
      if (inView) {
        const { load, id } = this.props;
        const root = document.getElementById(id);
        this.Child = loadable(load);
        this.setState({
          renderChild: true,
        });
      }
    };

    render() {
      if (typeof window !== 'undefined')   // Avoid client side hyration
      {
        if (this.state.renderChild) {
          return React.createElement(this.Child, this.props);
        }

        return (
          <InView
            rootMargin="640px"  // to avoid janky experiency in case the user scrolls fast
            triggerOnce
            dangerouslySetInnerHTML={{ __html: '' }}
            suppressHydrationWarning
            onChange={this.handleInviewChange}
            {...this.props}
          />
        );
      }

      return (
        <div dangerouslySetInnerHTML={{ __html: this.props.serverMarkup }} />
      );
    }
}

export default Hydrator;
