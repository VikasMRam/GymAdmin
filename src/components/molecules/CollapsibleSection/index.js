import React, { Component } from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';
import { key } from 'styled-theme';
import { bool, string, node, oneOf, object } from 'prop-types';

import { size } from 'sly/components/themes';
import { Hr, Heading, Icon } from 'sly/components/atoms';

const marginBottom = p => (p.collapsed ? 0 : size('spacing.xLarge'));
const laptopLargeWidth = (p) => {
  switch (p.size) {
    case 'small':
      return size('layout.sideColumn');
    case 'regular':
      return size('layout.mainColumn');
    default:
      return size('layout.laptopLarge');
  }
};

const Section = styled.section`
  padding-bottom: ${marginBottom};
  transition: padding-bottom ${key('transitions.default')};

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: ${laptopLargeWidth};
  }
`;

const StyledHr = styled(Hr)`
  margin-bottom: 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: ${size('spacing.xLarge')} 0;

  :hover {
    cursor: pointer;
  }
`;

const StyledHeading = styled(Heading)`
  margin: 0;
`;

const contentHeight = props => (!props.collapsed ? `${props.maxHeight}px` : 0);
const Content = styled.div`
  height: ${contentHeight};
  overflow: hidden;
  transition: height ${key('transitions.default')};
`;

const getHeadingLevel = (size) => {
  switch (size) {
    case 'small':
      return 'subtitle';
    default:
      return 'title';
  }
};
export default class CollapsibleSection extends Component {
  static propTypes = {
    children: node,
    title: string.isRequired,
    collapsedDefault: bool.isRequired,
    size: oneOf(['small', 'regular', 'large']),
    innerRef: object,
    noHr: bool,
  };

  static defaultProps = {
    collapsedDefault: false,
    size: 'regular',
    noHr: false,
  };

  static convertToClassName(str) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9_\s-]/, '')
      .replace(/[\s-]+/, ' ')
      .replace(/\s+/g, '-');
  }

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
      // TODO: Add Stories and Test for noHr
      noHr,
      ...props
    } = this.props;
    const { collapsed, maxHeight } = this.state;
    return (
      <Measure onResize={this.onResize}>
        {({ measureRef }) => (
          <Section
            collapsed={collapsed}
            size={size}
            className={this.constructor.convertToClassName(title)}
            innerRef={innerRef}
          >
            {!noHr && <StyledHr />}
            <Header onClick={this.toggle} transparent ghost>
              <StyledHeading level={getHeadingLevel(size)}>
                {title}
              </StyledHeading>
              <Icon icon="chevron" palette="grays" flip={!collapsed} />
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
