import React, { Component } from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { key } from 'styled-theme'; 
import { bool, number, oneOfType, oneOf } from 'prop-types';

import { size } from 'sly/components/themes';
import { Block, Button } from 'sly/components/atoms';

export const blockCapHeight = props => !props.collapsed
  ? `${props.maxHeight}px`
  : typeof props.minHeight === 'number'
    ? `${props.minHeight}px` 
    : size('collapsible', props.minHeight);

export const ReadMore = styled(Button)`
  padding: 0;
  border: 0;
`;

const BlockCap = styled.div`
  height: ${blockCapHeight};
  overflow: hidden;
  transition: height ${key('transitions.default')};
`;

export default class CollapsibleBlock extends Component {
  static propTypes = {
    collapsedDefault: bool,
    minHeight: oneOfType([number, oneOf(['small', 'regular', 'large'])]),
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

  onResize = ({entry={}}) => {
    this.setState({ 
      maxHeight: entry.height
    });
  }

  render() {
    const { children, minHeight, collapsedDefault, ...props } = this.props;
    const { collapsed, maxHeight } = this.state;

    return (
      <Measure onResize={this.onResize}>
        {({ measureRef }) => 
          <div>
            <BlockCap maxHeight={maxHeight} minHeight={minHeight} collapsed={collapsed}>
              <div ref={measureRef} {...props}>
                { children }
              </div>
            </BlockCap>
            <ReadMore
              onClick={this.toggle}
              transparent
              ghost
            >
              {collapsed ? 'Read more' : 'Read less'}
            </ReadMore>
          </div>
        }
      </Measure>
    );
  }
}
