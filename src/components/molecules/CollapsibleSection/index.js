import React, { Component } from 'react';
import Measure from 'react-measure';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { bool, string, node, oneOf, object } from 'prop-types';

import { size, key, palette } from 'sly/components/themes';
import { Icon, ClampedText } from 'sly/components/atoms';

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
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${size('spacing.xLarge')};

  :hover {
    cursor: pointer;
  }
`;

const StyledHeading = styled(ClampedText)`
  margin: 0;
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

const ChildrenSection = styled.div`
  padding: 0 ${size('spacing.xLarge')};
  padding-bottom: ${size('spacing.xLarge')};
  ${ifProp('collapsed', css`
    padding-bottom: 0;
  `)};
`;

const BottomSection = styled.div`
  background-color: ${palette('grey', 'stroke')};
  padding: ${size('spacing.xLarge')};
  border-top: ${size('border.regular')} solid ${palette('slate', 'stroke')};
`;

export default class CollapsibleSection extends Component {
  static propTypes = {
    children: node,
    botttomSection: node,
    title: string.isRequired,
    collapsedDefault: bool.isRequired,
    size: oneOf(['small', 'regular', 'large']),
    innerRef: object,
    paddedContent: bool,
  };

  static defaultProps = {
    collapsedDefault: false,
    size: 'regular',
    paddedContent: false,
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
      botttomSection,
      title,
      collapsedDefault,
      size,
      innerRef,
      paddedContent,
      ...props
    } = this.props;
    const { collapsed, maxHeight } = this.state;
    return (
      <Measure onResize={this.onResize}>
        {({ measureRef }) => (
          <Section
            paddedContent={paddedContent}
            collapsed={collapsed}
            size={size}
            innerRef={innerRef}
          >
            <Header onClick={this.toggle}>
              <StyledHeading weight="medium" level={getHeadingLevel(size)} size={getHeadingSize(size)}>
                {title}
              </StyledHeading>
              <Icon icon="chevron" size="regular" palette="slate" flip={!collapsed} />
            </Header>
            <Content maxHeight={maxHeight} collapsed={collapsed}>
              <div ref={measureRef} {...props}>
                <ChildrenSection collapsed={collapsed}>
                  {children}
                </ChildrenSection>
                {botttomSection &&
                  <BottomSection>
                    {botttomSection}
                  </BottomSection>
                }
              </div>
            </Content>
          </Section>
        )}
      </Measure>
    );
  }
}
