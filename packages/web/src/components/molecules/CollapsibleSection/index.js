import React, { Component } from 'react';
import Measure from 'react-measure';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { bool, string, node, oneOf, object } from 'prop-types';

import { size, key, palette } from 'sly/common/components/themes';
import { Icon, Heading } from 'sly/common/components/atoms';
import { ClampedText } from 'sly/web/components/atoms';
import { weight as weightPropType } from 'sly/common/propTypes/weight';
import Block from 'sly/common/components/atoms/Block';

const Section = styled.section`
  transition: padding-bottom ${key('transitions.default')};
  max-width: 100%;

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
  ${ifProp('noPadding', css`
    padding: 0;
  `)};
`;

export const BottomSection = styled.div`
  background-color: ${palette('grey', 'background')};
  padding: ${size('spacing.xLarge')};
  border-top: ${size('border.regular')} solid ${palette('slate', 'stroke')};
`;

const StyledHeading = styled(Heading)`
  margin: 0;
  display: inherit;
`;

export default class CollapsibleSection extends Component {
  static propTypes = {
    children: node,
    title: string.isRequired,
    collapsedDefault: bool.isRequired,
    size: oneOf(['small', 'regular', 'large']),
    innerRef: object,
    className: string,
    clampTitle: bool,
    headingWeight: weightPropType,
    borderless: bool,
    id: string,
  };

  static defaultProps = {
    collapsedDefault: false,
    size: 'regular',
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
      className,
      clampTitle,
      headingWeight,
      borderless,
      showIf,
      ...props
    } = this.props;
    const { collapsed, maxHeight } = this.state;
    return (
      <Measure onResize={this.onResize}>
        {({ measureRef }) => (
          <Section
            as={Block}
            collapsed={collapsed}
            borderless={borderless}
            size={size}
            ref={innerRef}
            showIf={showIf}
            className={className}
          >
            <Header onClick={this.toggle} borderless={borderless}>
              {clampTitle &&
                <StyledHeading weight={headingWeight} level="title" size={getHeadingSize(size)}>
                  <ClampedText weight={headingWeight} level="title" size={getHeadingSize(size)}>
                    {title}
                  </ClampedText>
                </StyledHeading>
              }
              {!clampTitle &&
                <StyledHeading weight={headingWeight} level="title" size={getHeadingSize(size)}>
                  {title}
                </StyledHeading>
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
