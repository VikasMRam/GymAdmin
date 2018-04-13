import React, { Component } from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { key } from 'styled-theme';
import { bool, string, oneOfType, oneOf } from 'prop-types';

import { size } from 'sly/components/themes';
import { Hr, Block, Button, Heading, Icon } from 'sly/components/atoms';

const Section = styled.section`
  padding-bottom: ${size('spacing.large')};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: ${size('spacing.large')};
`;

const scaleX = p => p.collapsed ? 1 : -1;
const StyledIcon = styled(Icon)`
  transform: scaleY(${scaleX});
  transition: transform ${key('transitions.fast')};
`;

const contentHeight = props => !props.collapsed ? `${props.maxHeight}px` : 0;
const Content = styled.div`
  height: ${contentHeight};
  overflow: hidden;
  transition: height ${key('transitions.default')};
`;

export default class CollapsibleSection extends Component {
  static propTypes = {
    title: string.isRequired,
    collapsedDefault: bool.isRequired,
  };

  static defaultProps = {
    collapsedDefault: false,
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
    const { children, title, minHeight, collapsedDefault, ...props } = this.props;
    const { collapsed, maxHeight } = this.state;

    return (
      <Measure onResize={this.onResize}>
        {({ measureRef }) =>
          <Section>
            <Hr />
            <Header
              onClick={this.toggle}
              transparent
              ghost
            >
              <Heading>{title}</Heading>
              <StyledIcon icon="chevron" palette="grays" collapsed={collapsed} />
            </Header>
            <Content maxHeight={maxHeight} collapsed={collapsed}>
              <div ref={measureRef} {...props}>
                { children }
              </div>
            </Content>
          </Section>
        }
      </Measure>
    );
  }
}
