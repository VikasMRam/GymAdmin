import React, { Component } from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';
import { bool, number, string, oneOfType, oneOf, node } from 'prop-types';

import { size, key, getKey } from 'sly/components/themes';
import { Link, Icon, Block } from 'sly/components/atoms';

export const blockCapHeight = (props) => {
  if (!props.isRenderedHeightBigger) {
    return 'auto';
  }
  if (!props.collapsed) {
    return `${props.maxHeight}px`;
  }
  if (typeof props.minHeight === 'number') {
    return `${props.minHeight}px`;
  }
  return size('collapsible', props.minHeight);
};

export const ReadMore = styled(Link)`
  display: flex;
  align-items: center;
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

const StyledBlock = styled(Block)`
  margin-right: ${size('spacing.large')};
`;

export default class CollapsibleBlock extends Component {
  static propTypes = {
    blockClassName: string,
    collapsedDefault: bool,
    minHeight: oneOfType([number, oneOf(['tiny', 'small', 'regular', 'large'])]),
    children: node,
  };

  static defaultProps = {
    minHeight: 'small',
    collapsedDefault: true,
  };

  state = {
    collapsed: this.props.collapsedDefault,
  };

  onResize = ({ entry = {} }) => this.setState({
    maxHeight: entry.height,
  });

  toggle = () => this.setState({
    collapsed: !this.state.collapsed,
  });

  render() {
    const {
      children, minHeight, collapsedDefault, blockClassName, ...props
    } = this.props;
    const { collapsed, maxHeight } = this.state;
    const collapsibleMinHeight =
      getKey(`sizes.collapsible.${minHeight}`).replace('rem', '') * 16;

    return (
      <Measure onResize={this.onResize} margin>
        {({ measureRef }) => (
          <div className={blockClassName}>
            <BlockCap maxHeight={maxHeight} minHeight={minHeight} collapsed={collapsed} isRenderedHeightBigger={maxHeight > collapsibleMinHeight}>
              <div ref={measureRef} {...props}>
                { children }
                <OnePix />
              </div>
            </BlockCap>
            {maxHeight > collapsibleMinHeight &&
              <ReadMore
                onClick={this.toggle}
                transparent
              >
                <StyledBlock weight="medium" palette="primary">
                  {collapsed ? 'Show more' : 'Show less'}
                </StyledBlock>
                <Icon icon="chevron" palette="slate" size="small" flip={!collapsed} />
              </ReadMore>
            }
          </div>
        )
        }
      </Measure>
    );
  }
}
