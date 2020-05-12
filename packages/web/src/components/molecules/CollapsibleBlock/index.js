import React, { Component } from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';
import { bool, number, string, oneOfType, oneOf, node } from 'prop-types';
import { ifProp } from 'styled-tools';

import pad from 'sly/components/helpers/pad';
import SlyEvent from 'sly/services/helpers/events';
import { size, key, getKey, remToPx } from 'sly/components/themes';
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

export const ReadMore = styled(({ chevronOnLeft, moreLabelOn, ...rest }) => <Link {...rest} />)`
  display: flex;
  align-items: center;
  justify-content: ${ifProp({ moreLabelOn: 'center' }, 'center')};
  flex-direction: ${ifProp('chevronOnLeft', 'row-reverse')};
  padding-top: ${size('spacing.small')};
  padding-bottom: ${size('spacing.small')};

  > *:${ifProp('chevronOnLeft', 'last-child', 'first-child ')} {
    margin-right: ${size('spacing.small')};
  }
`;

const PaddedReadMore = pad(ReadMore, 'large');

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
    children: node,
    collapsedLabel: string.isRequired,
    notCollapsedLabel: string.isRequired,
    chevronOnLeft: bool,
    expandTo: oneOf(['bottom', 'top']).isRequired,
    moreLabelOn: oneOf(['left', 'center']).isRequired,
  };

  static defaultProps = {
    minHeight: 'small',
    collapsedDefault: true,
    collapsedLabel: 'Show more',
    notCollapsedLabel: 'Show less',
    expandTo: 'top',
    moreLabelOn: 'left',
  };

  state = {
    collapsed: this.props.collapsedDefault,
  };

  onResize = ({ entry = {} }) => this.setState({
    maxHeight: entry.height,
  });

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    const label = !this.state.collapsed ? 'Show Less' : 'Show More';
    const event = {
      action: `toggle-${this.props.blockClassName}`, label,
    };
    SlyEvent.getInstance().sendEvent(event);
  };

  render() {
    const {
      children, minHeight, collapsedDefault, blockClassName, collapsedLabel, notCollapsedLabel,
      chevronOnLeft, expandTo, moreLabelOn, ...props
    } = this.props;
    const { collapsed, maxHeight } = this.state;
    const height = getKey(`sizes.collapsible.${minHeight}`);
    const collapsibleMinHeight = height ? remToPx(height) : minHeight;

    const getContent = measureRef => (
      <BlockCap maxHeight={maxHeight} minHeight={minHeight} collapsed={collapsed} isRenderedHeightBigger={maxHeight > collapsibleMinHeight}>
        <div ref={measureRef} {...props}>
          { children }
          <OnePix />
        </div>
      </BlockCap>
    );
    const ReadMoreComponent = expandTo === 'top' ? ReadMore : PaddedReadMore;

    return (
      <Measure onResize={this.onResize} margin>
        {({ measureRef }) => (
          <div className={blockClassName}>
            {expandTo === 'top' && getContent(measureRef)}
            {maxHeight > collapsibleMinHeight &&
              <ReadMoreComponent
                onClick={this.toggle}
                chevronOnLeft={chevronOnLeft}
                moreLabelOn={moreLabelOn}
              >
                <Block size="caption" palette="primary">
                  {collapsed ? collapsedLabel : notCollapsedLabel}
                </Block>
                <Icon icon="chevron" palette="primary" size="small" flip={!collapsed} />
              </ReadMoreComponent>
            }
            {expandTo === 'bottom' && getContent(measureRef)}
          </div>
        )}
      </Measure>
    );
  }
}
