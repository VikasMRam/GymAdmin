import React, { Component } from 'react';
import Measure from 'react-measure';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { bool, string, node, oneOf, object } from 'prop-types';

import { size, key, palette } from 'sly/components/themes';
import { Icon, ClampedText, Block } from 'sly/components/atoms';
import { weight as weightPropType } from 'sly/propTypes/weight';

// const marginBottom = (p) => {
//   if (p.collapsed) {
//     return 0;
//   }
//   return p.paddedContent ?
//     size('spacing.large') : size('spacing.xLarge');
// };

const Section = styled.section`
  transition: padding-bottom ${key('transitions.default')};
  max-width: 100%;

  margin-bottom: ${size('spacing.large')};
  border: ${p => p.borderless ? 'none' : size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${p => p.borderless ? 'none' : size('spacing.small')};
`;

export const Header = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: auto auto;
  padding: ${size('spacing.xLarge')} ${p => p.borderless ? 0 : ''};

  :hover {
    cursor: pointer;
  }
`;

const contentHeight = ({ collapsed, maxHeight }) => (!collapsed ? `${maxHeight}px` : 0);
const Content = styled.div`
  height: ${contentHeight};
  transition: height ${key('transitions.default')};
  ${ifProp('collapsed', css`
    overflow: hidden;
  `, css`
    overflow: visible;
    animation: 0.4s delay-overflow;
  `)};
  @keyframes delay-overflow {
    from { overflow: hidden; }
  }
`;

const getHeadingLevel = (size) => {
  switch (size) {
    case 'small':
      return 'body';
    default:
      return 'subtitle';
  }
};
const getHeadingSize = (size) => {
  switch (size) {
    case 'small':
      return 'body';
    default:
      return 'subtitle';
  }
};

export const MainSection = styled.div`
  padding: 0 ${size('spacing.xLarge')};
  padding-bottom: ${size('spacing.xLarge')};
  ${ifProp('collapsed', css`
    padding-bottom: 0;
  `)};
`;

export const BottomSection = styled.div`
  background-color: ${palette('grey', 'background')};
  padding: ${size('spacing.xLarge')};
  border-top: ${size('border.regular')} solid ${palette('slate', 'stroke')};
`;

export default class CollapsibleSection extends Component {
  static propTypes = {
    children: node,
    title: string.isRequired,
    collapsedDefault: bool.isRequired,
    size: oneOf(['small', 'regular', 'large']),
    innerRef: object,
    paddedContent: bool,
    className: string,
    clampTitle: bool,
    headingWeight: weightPropType,
    borderless: bool,
  };

  static defaultProps = {
    collapsedDefault: false,
    size: 'regular',
    paddedContent: false,
    headingWeight: 'medium',
    borderless: false,
  };

  state = {
    collapsed: this.props.collapsedDefault,
  };

  onResize = ({ entry = {} }) => {
    this.setState({
      maxHeight: entry.height,
    });
  };

  toggle = () =>
    this.setState({
      collapsed: !this.state.collapsed,
    });

  render() {
    const {
      children,
      title,
      collapsedDefault,
      size,
      innerRef,
      paddedContent,
      className,
      clampTitle,
      headingWeight,
      borderless,
      ...props
    } = this.props;
    const { collapsed, maxHeight } = this.state;
    return (
      <Measure onResize={this.onResize}>
        {({ measureRef }) => (
          <Section
            paddedContent={paddedContent}
            collapsed={collapsed}
            borderless={borderless}
            size={size}
            innerRef={innerRef}
            className={className}
          >
            <Header onClick={this.toggle} borderless={borderless}>
              {clampTitle &&
                <ClampedText weight={headingWeight} level={getHeadingLevel(size)} size={getHeadingSize(size)}>
                  {title}
                </ClampedText>
              }
              {!clampTitle &&
                <Block weight={headingWeight} level={getHeadingLevel(size)} size={getHeadingSize(size)}>
                  {title}
                </Block>
              }
              <Icon icon="chevron" palette="slate" flip={!collapsed} />
            </Header>
            <Content maxHeight={maxHeight} collapsed={collapsed}>
              <div ref={measureRef} {...props}>
                {children}
              </div>
            </Content>
          </Section>
        )}
      </Measure>
    );
  }
}
