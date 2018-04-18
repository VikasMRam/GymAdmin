import React, { Component } from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import { key } from 'styled-theme';
import { bool, string, node } from 'prop-types';

import { size } from 'sly/components/themes';
import { Hr, Heading, Icon } from 'sly/components/atoms';

const marginBottom = p => p.collapsed ? 0 : size('spacing.xLarge');
const Section = styled.section`
  padding-bottom: ${marginBottom};
  transition: padding-bottom ${key('transitions.default')};
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

const scaleY = p => p.collapsed ? 1 : -1;
const StyledIcon = styled(Icon)`
  transform: scaleY(${scaleY});
  transition: transform ${key('transitions.fast')};
`;

const contentHeight = props => !props.collapsed ? `${props.maxHeight}px` : 0;
const Content = styled.div`
  height: ${contentHeight};
  overflow: ${ifProp('collapsed', 'hidden', 'unset')};
  transition: height ${key('transitions.default')};
`;

export default class CollapsibleSection extends Component {
  static propTypes = {
    children: node,
    title: string.isRequired,
    collapsedDefault: bool.isRequired,
  };

  static defaultProps = {
    collapsedDefault: false,
  };

  state = {
    collapsed: this.props.collapsedDefault,
  };

  onResize = ({ entry = {} }) => {
    this.setState({
      maxHeight: entry.height,
    });
  }

  toggle = () => this.setState({
    collapsed: !this.state.collapsed,
  });

  render() {
    const {
      children, title, collapsedDefault, ...props
    } = this.props;
    const { collapsed, maxHeight } = this.state;

    return (
      <Measure onResize={this.onResize}>
        {({ measureRef }) => (
          <Section collapsed={collapsed}>
            <StyledHr />
            <Header
              onClick={this.toggle}
              transparent
              ghost
            >
              <StyledHeading>{title}</StyledHeading>
              <StyledIcon icon="chevron" palette="grays" collapsed={collapsed} />
            </Header>
            <Content maxHeight={maxHeight} collapsed={collapsed}>
              <div ref={measureRef} {...props}>
                { children }
              </div>
            </Content>
          </Section>
        )}
      </Measure>
    );
  }
}
