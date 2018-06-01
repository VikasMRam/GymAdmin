import React, { Component } from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';
import { key } from 'styled-theme';
import { ifProp } from 'styled-tools';
import { bool, string, node, oneOf, object } from 'prop-types';

import { size } from 'sly/components/themes';
import { Hr, Heading, Icon } from 'sly/components/atoms';

const marginBottom = p => (p.collapsed ? 0 : size('spacing.xLarge'));

const Section = styled.section`
  padding-bottom: ${marginBottom};
  transition: padding-bottom ${key('transitions.default')};
  max-width: 100%;
`;

const StyledHr = styled(Hr)`
  margin-bottom: 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${ifProp('noHr', size('spacing.large'), size('spacing.xLarge'))} 0;

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
const getHeadingSize = (size) => {
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
          <Section collapsed={collapsed} size={size} innerRef={innerRef}>
            {!noHr && <StyledHr />}
            <Header onClick={this.toggle} transparent ghost noHr={noHr}>
              <StyledHeading level={getHeadingLevel(size)}  size={getHeadingSize(size)}>
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
