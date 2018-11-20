import React, { Component } from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';
import { bool, number, string, oneOfType, oneOf } from 'prop-types';

import { size, key } from 'sly/components/themes';
import { Block, Link } from 'sly/components/atoms';

export const blockCapHeight = props => !props.collapsed
  ? `${props.maxHeight}px`
  : typeof props.minHeight === 'number'
    ? `${props.minHeight}px`
    : size('collapsible', props.minHeight);

export const ReadMore = styled(Link)`
  display: block;
`;

const BlockCap = styled.div`
  height: ${blockCapHeight};
  overflow: hidden;
  transition: height ${key('transitions.default')};
`;

const OnePix = styled.div`
  // hack so last element in the measureaable element
  // is not one with a margin-bottom, this way 
  // getBoundingBox will return the right measure
  height: 1px;
  margin-top: -1px;
`;

export default class CollapsibleBlock extends Component {
  static propTypes = {
    blockClassName: string,
    collapsedDefault: bool,
    minHeight: oneOfType([number, oneOf(['tiny', 'small', 'regular', 'large'])]),
  };

  static defaultProps = {
    minHeight: 'small',
    collapsedDefault: true,
  };

  state = {
    collapsed: this.props.collapsedDefault,
  };

  toggle = () => this.setState({
    collapsed: !this.state.collapsed,
  });

  onResize = ({entry={}}) => this.setState({
    maxHeight: entry.height
  });

  render() {
    const { children, minHeight, collapsedDefault, blockClassName, ...props } = this.props;
    const { collapsed, maxHeight } = this.state;

    return (
      <Measure onResize={this.onResize} margin>
        {({ measureRef }) =>
          <div className={blockClassName}>
            <BlockCap maxHeight={maxHeight} minHeight={minHeight} collapsed={collapsed}>
              <div ref={measureRef} {...props}>
                { children }
                <OnePix />
              </div>
            </BlockCap>
            <ReadMore
              onClick={this.toggle}
              transparent
            >
              {collapsed ? 'Read more' : 'Read less'}
            </ReadMore>
          </div>
        }
      </Measure>
    );
  }
}

