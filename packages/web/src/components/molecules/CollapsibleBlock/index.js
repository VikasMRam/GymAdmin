import React, { useState } from 'react';
import styled from 'styled-components';
// import Measure from 'react-measure';
import { bool, number, string, oneOfType, oneOf, node, object } from 'prop-types';
import { ifProp } from 'styled-tools';

import { remToPx, size, key, getKey } from 'sly/common/components/themes';
import pad from 'sly/web/components/helpers/pad';
import SlyEvent from 'sly/web/services/helpers/events';
import Chevron from 'sly/common/icons/Chevron';
import Block from 'sly/common/system/Block';
import Link from 'sly/common/system/Link';
import { space } from 'sly/common/system';

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
  return size('collapsible', props.minHeight); // TODO: should add collapsible block to theme?
};

export const ReadMore = styled(({ chevronOnLeft, moreLabelOn, ...rest }) => <Link {...rest} />)`
  display: flex;
  align-items: center;
  justify-content: ${ifProp({ moreLabelOn: 'center' }, 'center')};
  flex-direction: ${ifProp('chevronOnLeft', 'row-reverse')};
  padding-top: ${space('xxs')};
  padding-bottom: ${space('xxs')};

  > *:${ifProp('chevronOnLeft', 'last-child', 'first-child ')} {
    margin-right: ${space('xxs')};
  }
`;

const PaddedReadMore = pad(ReadMore, 'large');

const BlockCap = styled(Block)`
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

const CollapsibleBlock = ({
  children, minHeight, collapsedDefault, blockClassName, collapsedLabel, notCollapsedLabel, collapsedTextStyles,
  chevronOnLeft, expandTo, moreLabelOn, withReadLess, showChevron, minRowQty, collapsedLabelStyles, ...props
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [maxHeight] = useState(null);


  // const onResize = ({ entry = {} }) => setMaxHeight(entry.height);

  const toggle = () => {
    setCollapsed(!collapsed);
    const label = !collapsed ? 'Show Less' : 'Show More';
    const event = {
      action: `toggle-${blockClassName}`, label,
    };
    SlyEvent.getInstance().sendEvent(event);
  };


  const height = getKey(`sizes.collapsible.${minHeight}`);
  const collapsibleMinHeight = height ? remToPx(height) : minHeight;

  const getContent = measureRef => (
    <BlockCap {...props} maxHeight={maxHeight} minHeight={minHeight} collapsed={collapsed} isRenderedHeightBigger={maxHeight > collapsibleMinHeight}>
      <div ref={measureRef}>
        <Block
          sx={collapsed && minRowQty && {
              display: '-webkit-inline-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: minRowQty,
              textOverflow: 'ellipsis',
            }}
        >
          {children}
        </Block>
        <OnePix />
      </div>
    </BlockCap>
  );
  const ReadMoreComponent = expandTo === 'top' ? ReadMore : PaddedReadMore;


  const measureRef = () => {};

  return (
  // <Measure onResize={onResize} margin>
  //   {({ measureRef }) => (
    <div className={blockClassName}>
      {expandTo === 'top' && getContent(measureRef)}
      {(maxHeight > collapsibleMinHeight) && (withReadLess || (!withReadLess && collapsed)) &&
      <ReadMoreComponent
        onClick={toggle}
        chevronOnLeft={chevronOnLeft}
        moreLabelOn={moreLabelOn}
        {...(collapsedLabelStyles && { sx: collapsedLabelStyles })}
      >
        <Block
          textDecoration="underline"
          font="title-xs-azo"
          color="primary"
        >
          {collapsed ? collapsedLabel : notCollapsedLabel}
        </Block>
        {showChevron && <Chevron  color="primary" rotation={!collapsed ? 270 : 90} />}
      </ReadMoreComponent>
            }
      {expandTo === 'bottom' && getContent(measureRef)}
    </div>
  //     )}
  // </Measure>
  );
};


CollapsibleBlock.propTypes = {
  blockClassName: string,
  collapsedDefault: bool,
  minHeight: oneOfType([number, oneOf(['tiny', 'small', 'regular', 'large'])]),
  children: node,
  collapsedLabel: string.isRequired,
  notCollapsedLabel: string.isRequired,
  chevronOnLeft: bool,
  expandTo: oneOf(['bottom', 'top']).isRequired,
  moreLabelOn: oneOf(['left', 'center']).isRequired,
  withReadLess: bool,
  showChevron: bool,
  minRowQty: number,
  collapsedTextStyles: object,
  collapsedLabelStyles: object,
};


CollapsibleBlock.defaultProps = {
  minHeight: 'small',
  collapsedDefault: true,
  collapsedLabel: 'Show more',
  notCollapsedLabel: 'Show less',
  expandTo: 'top',
  moreLabelOn: 'left',
  withReadLess: true,
  showChevron: true,
  minRowQty: null,
  collapsedLabelStyles: null,
  collapsedTextStyle: null,
};

export default CollapsibleBlock;
